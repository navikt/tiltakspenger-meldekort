import { Request } from 'express';
import { FetchFraApi } from '@fetch/apiFetch';
import {
    Meldekort,
    MeldekortDagStatus,
    MeldekortStatus,
} from '@meldekort/common/typer/MeldekortBruker';
import dayjs, { Dayjs } from 'dayjs';
import weekOfYear from 'dayjs/plugin/weekOfYear.js';
import { ArenaMeldekortStatus, MeldekortBrukerDTO } from '@meldekort/common/typer/meldekort-bruker';
import { brukerTesterPågår } from '@utils/env';
import { KorrigerMeldekortResponse } from '@meldekort/common/typer/KorrigerMeldekort';
import { MeldekortMedSisteMeldeperiode } from '@meldekort/common/typer/alle-meldekort';
import {
    DemoInnvilgelsesperiode,
    demoInnvilgelseCookieNavn,
    parseDemoInnvilgelse,
    serialiserDemoInnvilgelse,
} from '@meldekort/common/demo';

dayjs.extend(weekOfYear);

export const fetchFraApiMock: FetchFraApi = async (req, path, _2, body) => {
    const tilstand = hentDemoTilstand(req);

    if (path === 'bruker') {
        return mockResponse(200, mockMeldekortBruker(tilstand));
    }

    if (path.startsWith('meldekort')) {
        const meldekortId = path.split('/').at(1);

        if (!meldekortId) {
            return mockResponse(404, null);
        }

        if (meldekortId === 'innsendte') {
            return mockResponse(200, {
                bruker: mockMeldekortBruker(tilstand),
                meldekortMedSisteMeldeperiode: alleMeldekortMedSisteMeldeperiode(tilstand),
            });
        }
        if (meldekortId === tilstand.forrigeMeldekort?.id) {
            return mockResponse(200, tilstand.forrigeMeldekort);
        }

        return mockResponse(200, tilstand.lagNesteMeldekort());
    }

    if (path === 'send-inn') {
        const innsendtMeldekort = JSON.parse(body as string);
        const meldekort = tilstand.alleMeldekort.find((mk) => mk.id === innsendtMeldekort?.id);

        if (!meldekort) {
            return mockResponse(500, null);
        }

        meldekort.dager = meldekort.dager.map((dag, index) => ({
            ...dag,
            status: innsendtMeldekort.dager[index].status,
        }));

        meldekort.innsendt = new Date().toISOString();

        return mockResponse(200, null);
    }

    if (path.startsWith('korrigering/')) {
        const meldekortId = path.split('/').at(1);
        const meldekort = tilstand.alleMeldekort.find((mk) => mk.id === meldekortId);
        const forrigeMeldekort = tilstand.forrigeMeldekort;
        if (!meldekort || !forrigeMeldekort) {
            return mockResponse(404, 'Fant ikke meldekortet');
        }

        return mockResponse(200, {
            forrigeMeldekort: meldekort,
            tilUtfylling: {
                meldeperiodeId: 'periode_1',
                kjedeId: 'kjede_1',
                dager: forrigeMeldekort.dager,
                periode: {
                    fraOgMed: forrigeMeldekort.fraOgMed,
                    tilOgMed: forrigeMeldekort.tilOgMed,
                },
                mottattTidspunktSisteMeldekort: forrigeMeldekort.innsendt!,
                maksAntallDagerForPeriode: forrigeMeldekort.maksAntallDager,
                kanSendeInnHelg: false,
            },
        } satisfies KorrigerMeldekortResponse);
    }

    console.log(`path uten response: ${path}`);

    return mockResponse(404, 'Mocket response ikke funnet');
};

const mockResponse = (status: number, body: any) =>
    ({
        status,
        ok: status >= 200 && status < 300,
        json: () => body,
    }) as unknown as ReturnType<typeof fetchFraApiMock>;

const formatDate = (date: string, plusDays: number = 0) => {
    return dayjs(date).add(plusDays, 'days').format('YYYY-MM-DD');
};

const lagNesteMeldekort = (): Meldekort => ({
    id: 'meldekort_2',
    meldeperiodeId: 'periode_2',
    versjon: 1,
    kjedeId: 'kjede_2',
    fraOgMed: '2025-01-06',
    tilOgMed: '2025-01-19',
    uke1: 2,
    uke2: 3,
    maksAntallDager: 10,
    status: MeldekortStatus.KAN_UTFYLLES,
    innsendt: null,
    kanSendes: null,
    dager: [
        ...Array.from({ length: 10 }).map((_, i) => ({
            status: MeldekortDagStatus.IKKE_BESVART,
            harRett: true,
            dag: formatDate('2025-01-06', i),
        })),
        ...Array.from({ length: 4 }).map((_, i) => ({
            status: MeldekortDagStatus.IKKE_BESVART,
            harRett: false || brukerTesterPågår(),
            dag: formatDate('2025-01-16', i),
        })),
    ],
});

const forrigeMeldekort: Meldekort = {
    id: 'meldekort_1',
    meldeperiodeId: 'periode_1',
    versjon: 1,
    kjedeId: 'kjede_1',
    fraOgMed: '2024-12-23',
    tilOgMed: '2025-01-05',
    uke1: 52,
    uke2: 1,
    innsendt: '2025-01-04T07:56:11.995Z',
    maksAntallDager: 10,
    status: MeldekortStatus.INNSENDT,
    kanSendes: null,
    dager: [
        ...Array.from({ length: 5 }).map((_, i) => ({
            status: MeldekortDagStatus.DELTATT_UTEN_LØNN_I_TILTAKET,
            harRett: true,
            dag: formatDate('2024-12-23', i),
        })),
        ...Array.from({ length: 2 }).map((_, i) => ({
            status: MeldekortDagStatus.IKKE_BESVART,
            harRett: true,
            dag: formatDate('2024-12-28', i),
        })),
        {
            status: MeldekortDagStatus.FRAVÆR_SYK,
            harRett: true,
            dag: formatDate('2024-12-30'),
        },
        {
            status: MeldekortDagStatus.FRAVÆR_SYKT_BARN,
            harRett: true,
            dag: formatDate('2024-12-31'),
        },
        {
            status: MeldekortDagStatus.DELTATT_UTEN_LØNN_I_TILTAKET,
            harRett: true,
            dag: formatDate('2025-01-01'),
        },
        {
            status: MeldekortDagStatus.FRAVÆR_STERKE_VELFERDSGRUNNER_ELLER_JOBBINTERVJU,
            harRett: true,
            dag: formatDate('2025-01-02'),
        },
        {
            status: MeldekortDagStatus.FRAVÆR_ANNET,
            harRett: true,
            dag: formatDate('2025-01-03'),
        },
        ...Array.from({ length: 2 }).map((_, i) => ({
            status: MeldekortDagStatus.IKKE_BESVART,
            harRett: true,
            dag: formatDate('2025-01-04', i),
        })),
    ],
};

const mockAlleMeldekort: Meldekort[] = [lagNesteMeldekort(), forrigeMeldekort];

type DemoTilstand = {
    lagNesteMeldekort: () => Meldekort;
    forrigeMeldekort: Meldekort | null;
    alleMeldekort: Meldekort[];
};

const defaultTilstand: DemoTilstand = {
    lagNesteMeldekort,
    forrigeMeldekort,
    alleMeldekort: mockAlleMeldekort,
};

const tilstandPerInnvilgelse = new Map<string, DemoTilstand>();

// Demoen kan settes opp med en valgt innvilgelsesperiode via cookie, se DemoPeriodeVelger i client
const hentDemoTilstand = (req: Request): DemoTilstand => {
    const cookieVerdi = lesCookie(req, demoInnvilgelseCookieNavn);
    const innvilgelse = cookieVerdi ? parseDemoInnvilgelse(cookieVerdi) : null;

    if (!innvilgelse) {
        return defaultTilstand;
    }

    const nøkkel = serialiserDemoInnvilgelse(innvilgelse);

    const eksisterende = tilstandPerInnvilgelse.get(nøkkel);
    if (eksisterende) {
        return eksisterende;
    }

    const tilstand = lagTilstandForInnvilgelse(innvilgelse);
    tilstandPerInnvilgelse.set(nøkkel, tilstand);

    return tilstand;
};

const lesCookie = (req: Request, navn: string): string | null => {
    const header = req.headers.cookie;
    if (!header) {
        return null;
    }

    for (const del of header.split(';')) {
        const [key, ...verdi] = del.trim().split('=');
        if (key === navn) {
            return decodeURIComponent(verdi.join('='));
        }
    }

    return null;
};

const lagTilstandForInnvilgelse = (innvilgelse: DemoInnvilgelsesperiode): DemoTilstand => {
    const førsteMeldeperiodeStart = mandagIUkenFor(dayjs(innvilgelse.fraOgMed));
    const harFlerePerioder = dayjs(innvilgelse.tilOgMed).diff(førsteMeldeperiodeStart, 'day') >= 14;

    const forrige = harFlerePerioder
        ? lagMeldekortForPeriode(førsteMeldeperiodeStart, innvilgelse, {
              nummer: 1,
              innsendt: true,
          })
        : null;

    const neste = lagMeldekortForPeriode(
        harFlerePerioder ? førsteMeldeperiodeStart.add(14, 'day') : førsteMeldeperiodeStart,
        innvilgelse,
        { nummer: 2, innsendt: false },
    );

    return {
        lagNesteMeldekort: () => structuredClone(neste),
        forrigeMeldekort: forrige,
        alleMeldekort: [structuredClone(neste), ...(forrige ? [forrige] : [])],
    };
};

const mandagIUkenFor = (dato: Dayjs) => dato.subtract((dato.day() + 6) % 7, 'day');

const maksDagerPerMeldeperiode = 10;

const lagMeldekortForPeriode = (
    periodeStart: Dayjs,
    innvilgelse: DemoInnvilgelsesperiode,
    { nummer, innsendt }: { nummer: number; innsendt: boolean },
): Meldekort => {
    const datoer = Array.from({ length: 14 }).map((_, i) => periodeStart.add(i, 'day'));

    const harRett = (dato: Dayjs) => {
        const iso = dato.format('YYYY-MM-DD');
        return iso >= innvilgelse.fraOgMed && iso <= innvilgelse.tilOgMed;
    };

    const antallDagerMedRett = datoer.filter(harRett).length;
    const maksAntallDager = Math.max(1, Math.min(maksDagerPerMeldeperiode, antallDagerMedRett));

    let antallBesvarte = 0;
    const dager = datoer.map((dato) => {
        let status = MeldekortDagStatus.IKKE_RETT_TIL_TILTAKSPENGER;

        if (harRett(dato)) {
            status =
                innsendt && antallBesvarte < maksAntallDager
                    ? innsendtDagStatus(antallBesvarte++)
                    : MeldekortDagStatus.IKKE_BESVART;
        }

        return {
            dag: dato.format('YYYY-MM-DD'),
            status,
        };
    });

    return {
        id: `meldekort_${nummer}`,
        meldeperiodeId: `periode_${nummer}`,
        kjedeId: `kjede_${nummer}`,
        versjon: 1,
        fraOgMed: periodeStart.format('YYYY-MM-DD'),
        tilOgMed: periodeStart.add(13, 'day').format('YYYY-MM-DD'),
        uke1: periodeStart.week(),
        uke2: periodeStart.add(7, 'day').week(),
        maksAntallDager,
        status: innsendt ? MeldekortStatus.INNSENDT : MeldekortStatus.KAN_UTFYLLES,
        innsendt: innsendt ? periodeStart.add(14, 'day').hour(8).toISOString() : null,
        kanSendes: null,
        dager,
    };
};

const innsendtDagStatus = (dagNummer: number): MeldekortDagStatus => {
    switch (dagNummer) {
        case 2:
            return MeldekortDagStatus.FRAVÆR_SYK;
        case 3:
            return MeldekortDagStatus.FRAVÆR_SYKT_BARN;
        default:
            return MeldekortDagStatus.DELTATT_UTEN_LØNN_I_TILTAKET;
    }
};

const mockMeldekortMedSisteMeldeperiode = (
    meldekort: Meldekort,
): MeldekortMedSisteMeldeperiode => ({
    meldekort: meldekort,
    sisteMeldeperiode: {
        meldeperiodeId: meldekort.meldeperiodeId,
        kjedeId: meldekort.kjedeId,
        periode: {
            fraOgMed: meldekort.fraOgMed,
            tilOgMed: meldekort.tilOgMed,
        },
        maksAntallDagerForPeriode: meldekort.maksAntallDager,
    },
});

const alleMeldekortMedSisteMeldeperiode = (
    tilstand: DemoTilstand,
): MeldekortMedSisteMeldeperiode[] =>
    [tilstand.lagNesteMeldekort(), tilstand.forrigeMeldekort]
        .filter((meldekort) => meldekort !== null)
        .map(mockMeldekortMedSisteMeldeperiode);

const mockMeldekortBruker = (tilstand: DemoTilstand): MeldekortBrukerDTO => ({
    harSak: true,
    arenaMeldekortStatus: ArenaMeldekortStatus.HAR_IKKE_MELDEKORT,
    nesteMeldekort: tilstand.lagNesteMeldekort(),
    forrigeMeldekort: tilstand.forrigeMeldekort ?? undefined,
    harSoknadUnderBehandling: false,
    kanSendeInnHelgForMeldekort: false,
});

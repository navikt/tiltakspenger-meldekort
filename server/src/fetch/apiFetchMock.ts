import { FetchFraApi } from '@fetch/apiFetch';
import { MeldekortDagStatus, MeldekortStatus } from '@common/typer/meldekort-utfylling';
import { MeldekortTilBrukerDTO } from '@common/typer/meldekort-dto';
import dayjs from 'dayjs';
import { ArenaMeldekortStatus, MeldekortBrukerDTO } from '@common/typer/meldekort-bruker';
import { brukerTesterPågår } from '@utils/env';

export const fetchFraApiMock: FetchFraApi = async (_1, path, _2, body) => {
    if (path === 'bruker') {
        return mockResponse(200, mockMeldekortBruker());
    }

    if (path.startsWith('meldekort')) {
        const meldekortId = path.split('/').at(1);

        if (!meldekortId) {
            return mockResponse(404, null);
        }

        if (meldekortId === 'alle') {
            return mockResponse(200, {
                meldekort: mockAlleMeldekort,
                bruker: mockMeldekortBruker(),
            });
        }

        return mockResponse(200, lagNesteMeldekort());
    }

    if (path === 'send-inn') {
        const innsendtMeldekort = JSON.parse(body as string);
        const meldekort = mockAlleMeldekort.find((mk) => mk.id === innsendtMeldekort?.id);

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

    return mockResponse(404, null);
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

const lagNesteMeldekort = (): MeldekortTilBrukerDTO => ({
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
    dager: [
        ...Array.from({ length: 10 }).map((_, i) => ({
            status: MeldekortDagStatus.IKKE_REGISTRERT,
            harRett: true,
            dag: formatDate('2025-01-06', i),
        })),
        ...Array.from({ length: 4 }).map((_, i) => ({
            status: MeldekortDagStatus.IKKE_REGISTRERT,
            harRett: false || brukerTesterPågår(),
            dag: formatDate('2025-01-16', i),
        })),
    ],
});

const forrigeMeldekort: MeldekortTilBrukerDTO = {
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
    dager: [
        ...Array.from({ length: 5 }).map((_, i) => ({
            status: MeldekortDagStatus.DELTATT_UTEN_LØNN_I_TILTAKET,
            harRett: true,
            dag: formatDate('2024-12-23', i),
        })),
        ...Array.from({ length: 2 }).map((_, i) => ({
            status: MeldekortDagStatus.IKKE_REGISTRERT,
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
            status: MeldekortDagStatus.FRAVÆR_VELFERD_GODKJENT_AV_NAV,
            harRett: true,
            dag: formatDate('2025-01-02'),
        },
        {
            status: MeldekortDagStatus.FRAVÆR_VELFERD_IKKE_GODKJENT_AV_NAV,
            harRett: true,
            dag: formatDate('2025-01-03'),
        },
        ...Array.from({ length: 2 }).map((_, i) => ({
            status: MeldekortDagStatus.IKKE_REGISTRERT,
            harRett: true,
            dag: formatDate('2025-01-04', i),
        })),
    ],
};

const mockAlleMeldekort: MeldekortTilBrukerDTO[] = [lagNesteMeldekort(), forrigeMeldekort];

const mockMeldekortBruker = (): MeldekortBrukerDTO => ({
    harSak: true,
    arenaMeldekortStatus: ArenaMeldekortStatus.HAR_IKKE_MELDEKORT,
    nesteMeldekort: lagNesteMeldekort(),
    forrigeMeldekort,
});

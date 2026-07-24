import { useState } from 'react';
import { useSWRConfig } from 'swr';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/nb.js';
import {
    BodyShort,
    Button,
    DatePicker,
    HStack,
    ToggleGroup,
    useRangeDatepicker,
    VStack,
} from '@navikt/ds-react';
import { appConfig, førstePåskedagPerÅr } from '@meldekort/common/appConfig';
import {
    DemoInnvilgelsesperiode,
    demoInnvilgelseCookieNavn,
    parseDemoInnvilgelse,
    serialiserDemoInnvilgelse,
} from '@meldekort/common/demo';

type Forhåndsvalg = 'standard' | 'jul' | 'påske' | 'sommer' | 'egen';

export const DemoPeriodeVelger = () => {
    const { mutate } = useSWRConfig();
    const [aktivInnvilgelse, setAktivInnvilgelse] = useState(lesInnvilgelseFraCookie);
    const [egenPeriode, setEgenPeriode] = useState<DemoInnvilgelsesperiode | null>(null);

    const iDag = dayjs();

    const forhåndsvalg: Array<{
        valg: Forhåndsvalg;
        label: string;
        innvilgelse: DemoInnvilgelsesperiode | null;
    }> = [
        { valg: 'standard', label: 'Standard', innvilgelse: null },
        { valg: 'jul', label: 'Jul', innvilgelse: julInnvilgelse(iDag) },
        { valg: 'påske', label: 'Påske', innvilgelse: påskeInnvilgelse(iDag) },
        { valg: 'sommer', label: 'Sommer', innvilgelse: sommerInnvilgelse(iDag) },
    ];

    const aktivtForhåndsvalg: Forhåndsvalg = aktivInnvilgelse
        ? (forhåndsvalg.find(
              (kandidat) =>
                  kandidat.innvilgelse &&
                  serialiserDemoInnvilgelse(kandidat.innvilgelse) ===
                      serialiserDemoInnvilgelse(aktivInnvilgelse),
          )?.valg ?? 'egen')
        : 'standard';

    const [visEgenPeriode, setVisEgenPeriode] = useState(aktivtForhåndsvalg === 'egen');

    const { datepickerProps, fromInputProps, toInputProps } = useRangeDatepicker({
        defaultSelected:
            aktivtForhåndsvalg === 'egen' && aktivInnvilgelse
                ? {
                      from: dayjs(aktivInnvilgelse.fraOgMed).toDate(),
                      to: dayjs(aktivInnvilgelse.tilOgMed).toDate(),
                  }
                : undefined,
        onRangeChange: (range) => {
            setEgenPeriode(
                range?.from && range?.to
                    ? {
                          fraOgMed: dayjs(range.from).format('YYYY-MM-DD'),
                          tilOgMed: dayjs(range.to).format('YYYY-MM-DD'),
                      }
                    : null,
            );
        },
    });

    const brukInnvilgelse = (innvilgelse: DemoInnvilgelsesperiode | null) => {
        settInnvilgelseCookie(innvilgelse);
        setAktivInnvilgelse(innvilgelse);
        // Demo-dataene hentes fra /data-endepunktene som leser cookien på nytt.
        // Revalider alt via SWR i stedet for en full sidelast, så vi unngår en flimrende mellomlasting.
        mutate(() => true);
    };

    const onValgChange = (valg: string) => {
        if (valg === 'egen') {
            setVisEgenPeriode(true);
            return;
        }

        setVisEgenPeriode(false);

        const valgt = forhåndsvalg.find((kandidat) => kandidat.valg === valg);
        if (valgt) {
            brukInnvilgelse(valgt.innvilgelse);
        }
    };

    return (
        <VStack gap={'space-8'}>
            <ToggleGroup
                label={'Vis demo for periode'}
                size={'small'}
                value={visEgenPeriode ? 'egen' : aktivtForhåndsvalg}
                onChange={onValgChange}
            >
                {forhåndsvalg.map(({ valg, label }) => (
                    <ToggleGroup.Item key={valg} value={valg} label={label} />
                ))}
                <ToggleGroup.Item value={'egen'} label={'Egen periode'} />
            </ToggleGroup>
            <BodyShort size={'small'}>
                Jul, påske og sommer viser meldekortet med de tidsstyrte informasjonsvarslene for
                ferie og helligdager. Med egen periode velger du selv perioden bruker har fått
                innvilget tiltakspenger for.
            </BodyShort>
            {visEgenPeriode && (
                <DatePicker {...datepickerProps}>
                    <HStack gap={'space-16'} align={'end'} wrap>
                        <DatePicker.Input
                            {...fromInputProps}
                            size={'small'}
                            label={'Innvilget fra'}
                        />
                        <DatePicker.Input
                            {...toInputProps}
                            size={'small'}
                            label={'Innvilget til'}
                        />
                        <Button
                            size={'small'}
                            disabled={!egenPeriode}
                            onClick={() => egenPeriode && brukInnvilgelse(egenPeriode)}
                        >
                            Vis demo
                        </Button>
                    </HStack>
                </DatePicker>
            )}
            <BodyShort size={'small'}>
                {aktivInnvilgelse
                    ? `Demoen viser en bruker med innvilget tiltakspenger ${formaterPeriode(aktivInnvilgelse)}.`
                    : 'Demoen viser standardperioden (januar 2025).'}
            </BodyShort>
        </VStack>
    );
};

const formaterPeriode = ({ fraOgMed, tilOgMed }: DemoInnvilgelsesperiode) => {
    const formater = (dato: string) => dayjs(dato).locale('nb').format('D. MMMM YYYY');
    return `${formater(fraOgMed)}–${formater(tilOgMed)}`;
};

const lesInnvilgelseFraCookie = (): DemoInnvilgelsesperiode | null => {
    const verdi = document.cookie
        .split(';')
        .map((del) => del.trim())
        .find((del) => del.startsWith(`${demoInnvilgelseCookieNavn}=`))
        ?.split('=')
        .at(1);

    return verdi ? parseDemoInnvilgelse(decodeURIComponent(verdi)) : null;
};

const settInnvilgelseCookie = (innvilgelse: DemoInnvilgelsesperiode | null) => {
    const verdi = innvilgelse ? serialiserDemoInnvilgelse(innvilgelse) : '';
    const maxAge = innvilgelse ? 60 * 60 * 24 * 365 : 0;

    document.cookie = `${demoInnvilgelseCookieNavn}=${verdi}; path=${appConfig.baseUrl}; max-age=${maxAge}; SameSite=Lax`;
};

const mandagIUkenFor = (dato: Dayjs) => dato.subtract((dato.day() + 6) % 7, 'day');

// Innvilgelsen dekker meldekortet til utfylling og det forrige, innsendte meldekortet
const innvilgelseRundtMeldekort = (nesteMeldekortStart: Dayjs): DemoInnvilgelsesperiode => ({
    fraOgMed: nesteMeldekortStart.subtract(14, 'day').format('YYYY-MM-DD'),
    tilOgMed: nesteMeldekortStart.add(13, 'day').format('YYYY-MM-DD'),
});

// Meldekortet til utfylling skal dekke uken med julaften og uken etter, som treffer julevarselet
const julInnvilgelse = (iDag: Dayjs): DemoInnvilgelsesperiode => {
    const iÅr = mandagIUkenFor(dayjs(`${iDag.year()}-12-24`));
    const nesteMeldekortStart = iÅr.add(13, 'day').isBefore(iDag, 'day')
        ? mandagIUkenFor(dayjs(`${iDag.year() + 1}-12-24`))
        : iÅr;

    return innvilgelseRundtMeldekort(nesteMeldekortStart);
};

// Meldekortet til utfylling skal dekke påskeuken og uken med 2. påskedag, som treffer påskevarselet
const påskeInnvilgelse = (iDag: Dayjs): DemoInnvilgelsesperiode => {
    const påskedager = Object.values(førstePåskedagPerÅr).sort();
    const førstePåskedag =
        påskedager.find((dato) => !dayjs(dato).add(7, 'day').isBefore(iDag, 'day')) ??
        påskedager[påskedager.length - 1];

    return innvilgelseRundtMeldekort(mandagIUkenFor(dayjs(førstePåskedag)));
};

// Meldekortet til utfylling skal ligge innenfor sommerferie-tidsrommet 19. juni - 21. august
const sommerInnvilgelse = (iDag: Dayjs): DemoInnvilgelsesperiode => {
    const inneværendeUke = mandagIUkenFor(iDag);
    if (erInnenforSommerTidsrommet(inneværendeUke)) {
        return innvilgelseRundtMeldekort(inneværendeUke);
    }

    const iÅr = mandagIUkenFor(dayjs(`${iDag.year()}-06-29`));
    const nesteMeldekortStart = iÅr.add(13, 'day').isBefore(iDag, 'day')
        ? mandagIUkenFor(dayjs(`${iDag.year() + 1}-06-29`))
        : iÅr;

    return innvilgelseRundtMeldekort(nesteMeldekortStart);
};

const erInnenforSommerTidsrommet = (nesteMeldekortStart: Dayjs) => {
    const år = nesteMeldekortStart.year();

    return (
        nesteMeldekortStart.add(13, 'day').isAfter(dayjs(`${år}-06-19`), 'day') &&
        nesteMeldekortStart.isBefore(dayjs(`${år}-08-21`), 'day')
    );
};

import { Meldekort } from '@meldekort/common/typer/MeldekortBruker';
import { Alert, BodyLong, Link, List, VStack } from '@navikt/ds-react';
import { Tekst } from '@components/tekst/Tekst';
import { useSpråk } from '@context/språk/useSpråk';
import { førstePåskedagPerÅr } from '@meldekort/common/appConfig';
import dayjs from 'dayjs';

type Props = {
    meldekort: Meldekort;
    className?: string;
};

export const TidsstyrteMeldekortVarsler = ({ meldekort, className }: Props) => {
    const aktuelleVarsler = varsler.filter((varsel) => varsel.skalVises(meldekort));

    if (aktuelleVarsler.length === 0) {
        return null;
    }

    return (
        <VStack gap={'space-8'} className={className}>
            {aktuelleVarsler.map(({ id, Component }) => (
                <Alert variant={'info'} key={id}>
                    <Component />
                </Alert>
            ))}
        </VStack>
    );
};

type VarselForTidsrom = {
    id: string;
    Component: React.FunctionComponent;
    skalVises: (meldekort: Meldekort) => boolean;
};

const varselJul: VarselForTidsrom = {
    id: 'juleferieInfo',
    Component: () => <Tekst id={'juleferieInfo'} />,
    skalVises: (meldekort) => {
        const { uke1, uke2 } = meldekort;
        const potensielleJuleferieUker = [52, 53, 1];

        return potensielleJuleferieUker.some((uke) => uke === uke1 || uke === uke2);
    },
} as const;

const varselPåske: VarselForTidsrom = {
    id: 'påskeferieInfo',
    Component: () => <Tekst id={'påskeferieInfo'} />,
    skalVises: (meldekort) => {
        const { fraOgMed, uke1, uke2 } = meldekort;

        const year = dayjs(fraOgMed).year();
        const easterDate = førstePåskedagPerÅr[year];

        if (!easterDate) {
            return false;
        }

        const påskeuke1 = dayjs(easterDate).week();
        const påskeuke2 = påskeuke1 + 1;

        return [påskeuke1, påskeuke2].some((påskeuke) => påskeuke === uke1 || påskeuke === uke2);
    },
} as const;

const varselSommer: VarselForTidsrom = {
    id: 'sommerferieInfo',
    Component: () => {
        const { getTeksterForSpråk, getTekstForSpråk } = useSpråk();

        return (
            <VStack gap={'space-8'}>
                <BodyLong>
                    <Tekst id={'sommerferieInfoStart'} />
                </BodyLong>
                <List>
                    {getTeksterForSpråk({ id: 'sommerferieInfoListe' }).map((tekst) => (
                        <List.Item key={tekst}>{tekst}</List.Item>
                    ))}
                </List>
                <BodyLong>
                    <Tekst id={'sommerferieInfoLesMer'} />{' '}
                    <Link
                        href={getTekstForSpråk({ id: 'sommerferieInfoLenkeUrl' })}
                        inlineText={true}
                    >
                        <Tekst id={'sommerferieInfoLenkeTekst'} />
                    </Link>
                </BodyLong>
            </VStack>
        );
    },
    skalVises: (meldekort) => {
        const { fraOgMed, tilOgMed } = meldekort;

        const year = dayjs(fraOgMed).year();
        const sommerStart = dayjs(`${year}-06-19`);
        const sommerSlutt = dayjs(`${year}-08-21`);

        return dayjs(tilOgMed).isAfter(sommerStart) && dayjs(fraOgMed).isBefore(sommerSlutt);
    },
} as const;

const varsler: VarselForTidsrom[] = [varselJul, varselPåske, varselSommer] as const;

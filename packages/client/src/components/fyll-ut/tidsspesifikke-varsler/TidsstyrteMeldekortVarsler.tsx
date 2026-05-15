import { Meldekort } from '@meldekort/common/typer/MeldekortBruker';
import { TekstId } from '@tekster/typer';
import { Alert, VStack } from '@navikt/ds-react';
import { Tekst } from '@components/tekst/Tekst';
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
            {aktuelleVarsler.map(({ tekstId }) => (
                <Alert variant={'info'} key={tekstId}>
                    <Tekst id={tekstId} />
                </Alert>
            ))}
        </VStack>
    );
};

type VarselForTidsrom = {
    tekstId: TekstId;
    skalVises: (meldekort: Meldekort) => boolean;
};

const varselJul: VarselForTidsrom = {
    tekstId: 'juleferieInfo',
    skalVises(meldekort) {
        const { uke1, uke2 } = meldekort;
        const potensielleJuleferieUker = [52, 53, 1];

        return potensielleJuleferieUker.some((uke) => uke === uke1 || uke === uke2);
    },
} as const;

const varselPåske: VarselForTidsrom = {
    tekstId: 'påskeferieInfo',
    skalVises(meldekort) {
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

const varsler: VarselForTidsrom[] = [varselJul, varselPåske] as const;

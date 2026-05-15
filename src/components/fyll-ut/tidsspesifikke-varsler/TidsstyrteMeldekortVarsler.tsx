import { Meldekort } from '@common/typer/MeldekortBruker.ts';
import { TekstId } from '@tekster/typer.ts';
import { Alert, VStack } from '@navikt/ds-react';
import { Tekst } from '@components/tekst/Tekst.tsx';
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

// Husk å oppdatere denne!
const førstePåskedagPerÅr: Record<number, string> = {
    2025: '2025-04-20',
    2026: '2026-04-05',
    2027: '2027-03-28',
    2028: '2028-04-16',
    2029: '2029-04-01',
};

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

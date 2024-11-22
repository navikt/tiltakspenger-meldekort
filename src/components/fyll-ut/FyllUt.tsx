import { Alert, BodyLong, Button, Checkbox, Heading, ReadMore } from '@navikt/ds-react';
import { Tekst } from '@components/tekst/Tekst';
import { MeldekortUtfylling } from '@typer/meldekort-utfylling';
import { MeldekortDagModal } from '@components/meldekort-dag-modal/MeldekortDagModal';
import { MeldekortUtfyllingProvider } from '@context/meldekort-utfylling/MeldekortUtfyllingProvider';
import { useEffect, useState } from 'react';
import { Lenke } from '@components/lenke/Lenke';
import { Steg1_Deltatt } from '@components/fyll-ut/steg-1-deltatt/Steg1_Deltatt';
import { getISOWeek } from 'date-fns';
import { formatterDato } from '@utils/datetime';
import { Steg2_Fravær } from '@components/fyll-ut/steg-2-fravær/Steg2_Fravær';

type Props = {
    meldekort: MeldekortUtfylling;
};

export type MeldekortSteg = 'deltatt' | 'fravær' | 'bekreft';

export const FyllUt = ({ meldekort }: Props) => {
    const [meldekortSteg, setMeldekortSteg] = useState<MeldekortSteg>('deltatt');

    const [ferdigUtfylt, setFerdigUtfylt] = useState(false);
    const [harBekreftet, setHarBekreftet] = useState(false);

    const { fraOgMed, tilOgMed } = meldekort.periode;

    const ukerTekst = `Uke ${getISOWeek(fraOgMed)} - ${getISOWeek(tilOgMed)}`;

    const datoerTekst = `${formatterDato({ dato: fraOgMed, medUkeDag: false })} - ${formatterDato({
        dato: tilOgMed,
        medUkeDag: false,
    })}`;

    useEffect(() => {
        scrollTo(0, 0)
    }, [meldekortSteg]);

    return (
        <div>
            <Heading size={'medium'} level={'2'}>
                {ukerTekst}
            </Heading>
            <BodyLong weight={'semibold'} spacing={true}>
                {datoerTekst}
            </BodyLong>
            {ferdigUtfylt && <Alert variant={'warning'}>{'Meldekortet er ikke sendt ennå!'}</Alert>}
            <MeldekortUtfyllingProvider
                meldekortUtfylling={meldekort}
                setMeldekortSteg={setMeldekortSteg}
            >
                {meldekortSteg === 'deltatt' && <Steg1_Deltatt />}
                {meldekortSteg === 'fravær' && <Steg2_Fravær />}
                <MeldekortDagModal />
            </MeldekortUtfyllingProvider>
            {ferdigUtfylt && (
                <Checkbox onChange={() => setHarBekreftet(!harBekreftet)}>
                    <Tekst id={'bekreftCheckbox'} />
                </Checkbox>
            )}
            {ferdigUtfylt && (
                <Button
                    disabled={!harBekreftet}
                    as={Lenke}
                    href={`/[meldekortId]/kvittering?meldekortId=${meldekort.id}`}
                >
                    {'Send inn'}
                </Button>
            )}
        </div>
    );
};

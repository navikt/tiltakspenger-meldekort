import style from './Steg3_Deltakelse.module.css';
import { useMeldekortUtfylling } from '@context/meldekort-utfylling/useMeldekortUtfylling';
import { Alert, BodyLong } from '@navikt/ds-react';
import { Kalender } from '@components/kalender/Kalender';
import { Tekst } from '@components/tekst/Tekst';
import { antallDagerValidering } from '@utils/utfyllingValidering';
import { DagerUtfyltTeller } from '@components/fyll-ut/dager-utfylt-teller/DagerUtfyltTeller';

import { MeldekortStegWrapper } from '@components/fyll-ut/MeldekortStegWrapper';
import { useRouting } from '@routing/useRouting';
import { getPath, getPathForMeldekortSteg, siteRoutePaths } from '@meldekort/common/siteRoutePaths';
import { MeldekortStegButtons } from '@components/fyll-ut/MeldekortStegButtons';
import { useInitMeldekortSteg } from '@components/fyll-ut/useInitMeldekortSteg';
import { Meldekort } from '@meldekort/common/typer/MeldekortBruker';
import { InternLenke } from '@components/lenke/InternLenke';
import { useSpråk } from '@context/språk/useSpråk';

type SSRProps = {
    brukersMeldekort: Meldekort;
    kanFylleUtHelg: boolean;
};

export const Steg3_Deltakelse = ({ brukersMeldekort, kanFylleUtHelg }: SSRProps) => {
    const { meldekortUtfylling } = useMeldekortUtfylling();

    useInitMeldekortSteg(brukersMeldekort, 'deltatt');

    if (!meldekortUtfylling) return <MeldekortEksistererIkke />;

    return (
        <DeltagelsUtfylling
            brukersMeldekort={brukersMeldekort}
            meldekortUtfylling={meldekortUtfylling}
            kanFylleUtHelg={kanFylleUtHelg}
        />
    );
};

const MeldekortEksistererIkke = () => {
    const { valgtSpråk } = useSpråk();
    return (
        <div>
            <Alert variant={'error'}>
                <InternLenke path={getPath(siteRoutePaths.forside)} locale={valgtSpråk}>
                    En feil har skjedd. Tilbake til forsiden
                </InternLenke>
            </Alert>
        </div>
    );
};

const DeltagelsUtfylling = ({
    brukersMeldekort,
    meldekortUtfylling,
    kanFylleUtHelg,
}: SSRProps & { meldekortUtfylling: Meldekort }) => {
    const { navigate } = useRouting();
    const { setMeldekortSteg, setVisValideringsfeil } = useMeldekortUtfylling();

    const { harForMangeDagerBesvart, harIngenDagerBesvart, harForFaDagerBesvart } =
        antallDagerValidering(brukersMeldekort, meldekortUtfylling);

    return (
        <MeldekortStegWrapper>
            <BodyLong>
                <Tekst id={'deltattHjelpIngress'} />
            </BodyLong>
            <Kalender
                meldekort={meldekortUtfylling}
                steg={'deltatt'}
                kanFylleUtHelg={kanFylleUtHelg}
            />
            <DagerUtfyltTeller
                brukersMeldekort={brukersMeldekort}
                meldekortUtfylling={meldekortUtfylling}
                className={style.teller}
            />

            <div className={style.knapperOgVarsel}>
                <MeldekortStegButtons
                    onNesteClick={() => {
                        if (
                            harForFaDagerBesvart ||
                            harIngenDagerBesvart ||
                            harForMangeDagerBesvart
                        ) {
                            setVisValideringsfeil(true);
                        }

                        setMeldekortSteg('oppsummering');
                        navigate(getPathForMeldekortSteg('oppsummering', meldekortUtfylling.id));
                        return true;
                    }}
                    onForrigeClick={() => {
                        setMeldekortSteg('lønn');
                        navigate(getPathForMeldekortSteg('lønn', meldekortUtfylling.id));
                    }}
                    onAvbrytClick={() => {
                        setMeldekortSteg('fravær');
                        navigate(getPath(siteRoutePaths.forside));
                    }}
                />
            </div>
        </MeldekortStegWrapper>
    );
};

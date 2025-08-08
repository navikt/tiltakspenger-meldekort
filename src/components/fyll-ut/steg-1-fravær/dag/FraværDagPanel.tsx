import { useMeldekortUtfylling } from '@context/meldekort-utfylling/useMeldekortUtfylling';
import { formatterDato } from '@utils/datetime';
import { BodyLong, Button } from '@navikt/ds-react';
import { classNames } from '@utils/classNames.ts';
import { Tekst } from '@components/tekst/Tekst';
import { MeldekortdagOppsummering } from '@components/kalender/statisk-dag/StatiskDagPanel';
import {
    meldekortStatusTilStyle,
    statusTilTekstId,
} from '@components/kalender/dag-felles/dagFellesUtils';
import { TekstSegmenter } from '@components/tekst/TekstSegmenter.tsx';

import style from './FraværDagPanel.module.css';
import { getTekst } from '@tekster/tekster.ts';
import { MeldekortDag, MeldekortDagStatus } from '@common/typer/MeldekortBruker';

type Props = {
    dag: MeldekortDag;
};

export const FraværDagPanel = ({ dag }: Props) => {
    const { setValgtMeldekortDag } = useMeldekortUtfylling();

    const { dag: dato, status } = dag;

    const datoTekst = formatterDato({ dato, medUkeDag: true, medStorForbokstav: true });

    const harDeltatt = status === MeldekortDagStatus.DELTATT_UTEN_LØNN_I_TILTAKET;
    const harMottattLønn = status === MeldekortDagStatus.DELTATT_MED_LØNN_I_TILTAKET;

    if (harDeltatt || harMottattLønn) {
        return <MeldekortdagOppsummering dag={dag} />;
    }

    const skjermleserMelding =
        status === MeldekortDagStatus.IKKE_BESVART
            ? getTekst({
                  id: 'fraværPanelRegistrerSR',
                  resolverProps: { datoTekst },
              })
            : getTekst({
                  id: 'fraværPanelValgRegistrertSR',
                  resolverProps: {
                      datoTekst,
                      valgtStatusTekst: getTekst({ id: statusTilTekstId[status] }),
                  },
              });

    return (
        <div className={classNames(style.fravær, meldekortStatusTilStyle[status])}>
            <div className={style.datoStatus}>
                <BodyLong className={style.dato}>{`${datoTekst}: `}</BodyLong>
                <TekstSegmenter id={statusTilTekstId[status]} weight={'semibold'} />
            </div>
            <Button
                size={'small'}
                variant={'secondary'}
                onClick={() => {
                    setValgtMeldekortDag(dag);
                }}
                className={style.knapp}
                aria-label={skjermleserMelding}
            >
                <Tekst id={'fraværPanelRegistrer'} />
            </Button>
        </div>
    );
};

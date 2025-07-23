import { formatterDato } from '@utils/datetime';
import { KorrigertMeldekortDag } from '../KorrigerMeldekortUtils';
import { classNames } from '@utils/classNames';
import styles from './OppsummeringAvKorrigertMeldekortDag.module.css';
import { BodyLong } from '@navikt/ds-react';
import { TekstSegmenter } from '@components/tekst/TekstSegmenter';
import {
    korrigerMeldekortStatusTilStyle,
    korrigerStatusTilIkon,
    korrigerStatusTilTekstId,
} from './OppsummeringAvKorrigertMeldekortDagUtils';
import { CircleSlashIcon } from '@navikt/aksel-icons';

//Denne komponenten ble ganske lik StatiskDagPanel.tsx etterhvert som ting ble diskuttert litt. Slå disse sammen til noe felles?
export const OppsummeringAvKorrigertMeldekortDag = ({ dag }: { dag: KorrigertMeldekortDag }) => {
    const { dato, status, harRett } = dag;
    const datoTekst = formatterDato({ dato, medUkeDag: true, medStorForbokstav: true });

    const IkonKomponent = harRett ? korrigerStatusTilIkon[status] : CircleSlashIcon;

    return (
        <div
            className={classNames(
                styles.componentContainer,
                korrigerMeldekortStatusTilStyle[status],
            )}
        >
            <IkonKomponent aria-hidden />
            <BodyLong>{`${datoTekst}: `}</BodyLong>
            <TekstSegmenter id={korrigerStatusTilTekstId[status]} weight={'semibold'} />
        </div>
    );
};

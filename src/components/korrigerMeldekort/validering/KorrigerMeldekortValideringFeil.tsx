import { Alert, BodyShort, VStack } from '@navikt/ds-react';
import {
    KorrigerMeldekortFeil,
    KorrigerMeldekortValideringResultat,
} from '@components/korrigerMeldekort/validering/korrigerMeldekortValideringUtils.ts';
import { Tekst } from '@components/tekst/Tekst.tsx';

type Props = {
    resultat: KorrigerMeldekortValideringResultat | null;
};

export const KorrigerMeldekortValideringFeil = ({ resultat }: Props) => {
    if (!resultat || resultat.feil.size === 0) {
        return null;
    }

    const { feil, maksAntallUtfylt, antallUtfylt } = resultat;

    return (
        <Alert variant="error">
            <VStack gap="space-16">
                {feil.has(KorrigerMeldekortFeil.ForMangeDager) && (
                    <>
                        <BodyShort>
                            <Tekst
                                id={'korrigeringUtfyllingFeilForMange'}
                                resolverProps={{ utfylt: antallUtfylt, maks: maksAntallUtfylt }}
                            />
                        </BodyShort>
                        <StatusMerknad />
                    </>
                )}

                {feil.has(KorrigerMeldekortFeil.ForFåDager) && (
                    <>
                        <BodyShort>
                            <Tekst
                                id={'korrigeringUtfyllingFeilForFå'}
                                resolverProps={{ utfylt: antallUtfylt, maks: maksAntallUtfylt }}
                            />
                        </BodyShort>
                        <StatusMerknad />
                    </>
                )}

                {feil.has(KorrigerMeldekortFeil.IngenEndring) && (
                    <BodyShort>
                        <Tekst id={'korrigeringUtfyllingFeilIngenEndring'} />
                    </BodyShort>
                )}
            </VStack>
        </Alert>
    );
};

const StatusMerknad = () => {
    return (
        <VStack>
            <BodyShort>
                <Tekst id={'korrigeringUtfyllingFeilStatusMerknad'} />
            </BodyShort>
            <ul>
                <li>
                    <Tekst id={'statusIkkeBesvart'} />
                </li>
                <li>
                    <Tekst id={'statusIkkeTiltaksdag'} />
                </li>
            </ul>
        </VStack>
    );
};

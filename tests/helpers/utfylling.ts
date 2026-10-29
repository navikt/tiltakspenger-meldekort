import { expect, Page } from '@playwright/test';
import { getTekst } from '../../packages/client/src/tekster/tekster';
import { MeldekortDagStatus } from '../../packages/common/src/typer/MeldekortBruker';
import { MeldekortUtfyltDTO } from '../../packages/common/src/typer/BrukersMeldekortUtfylling';
import { checkbox, knapp, radio, tekst } from './utils';

const fraværIngress = {
    [MeldekortDagStatus.FRAVÆR_SYK]: 'fraværModalSykIngress',
    [MeldekortDagStatus.FRAVÆR_SYKT_BARN]: 'fraværModalSyktBarnIngress',
    [MeldekortDagStatus.FRAVÆR_STERKE_VELFERDSGRUNNER_ELLER_JOBBINTERVJU]:
        'fraværModalSterkeVelferdsgrunnerEllerJobbintervjuIngress',
    [MeldekortDagStatus.FRAVÆR_ANNET]: 'fraværModalIkkeGodkjentIngress',
} as const;

export type Fraværstype = keyof typeof fraværIngress;

/**
 * Fravær er enten et antall dager med sykdom, eller én dag per fraværstype i rekkefølge
 */
export type Utfylling = {
    fravær: number | Fraværstype[];
    lønn: number;
    deltatt: number;
};

export const fyllUtSteg = async (page: Page, utfylling: Utfylling) => {
    await fyllUtFraværSteg(page, utfylling.fravær);
    await fyllUtLønnSteg(page, utfylling.lønn);
    await fyllUtDeltattSteg(page, utfylling.deltatt);
};

/**
 * Fyller ut fravær på de første dagene i meldekortet
 */
export const fyllUtFraværSteg = async (page: Page, fravær: Utfylling['fravær']) => {
    const fraværstyper: Fraværstype[] =
        typeof fravær === 'number'
            ? Array<Fraværstype>(fravær).fill(MeldekortDagStatus.FRAVÆR_SYK)
            : fravær;

    await radio(
        page,
        fraværstyper.length > 0 ? 'fraværHarHattFraværSvarJa' : 'fraværHarHattFraværSvarNei',
    ).click();

    const velgFraværKnapper = page.getByRole('button', {
        // datoTekst varierer for hver dag, så vi matcher på alt utenom den
        name: getTekst({
            id: 'fraværPanelRegistrerSR',
            locale: 'nb',
            resolverProps: { datoTekst: '' },
        }),
        exact: false,
    });

    for (const [i, fraværstype] of fraværstyper.entries()) {
        await expect(velgFraværKnapper.nth(i)).toHaveText(tekst('fraværPanelRegistrer'));
        await velgFraværKnapper.nth(i).click();
        await expect(page.getByRole('dialog')).toBeVisible();
        await radio(page, fraværIngress[fraværstype]).click();
        await knapp(page, 'lagre').click();
    }

    await knapp(page, 'neste').click();
};

export const fyllUtLønnSteg = async (page: Page, antallDager: number) => {
    await radio(
        page,
        antallDager > 0 ? 'lønnHarMottattLønnSvarJa' : 'lønnHarMottattLønnSvarNei',
    ).click();

    await klikkCheckboxer(page, 'lønnDagPrefix', antallDager);
    await knapp(page, 'neste').click();
};

export const fyllUtDeltattSteg = async (page: Page, antallDager: number) => {
    await klikkCheckboxer(page, 'deltattDagPrefix', antallDager);
    await knapp(page, 'neste').click();
};

const klikkCheckboxer = async (
    page: Page,
    prefix: 'lønnDagPrefix' | 'deltattDagPrefix',
    antall: number,
) => {
    const checkboxer = checkbox(page, prefix);
    for (let i = 0; i < antall; ++i) {
        await checkboxer.nth(i).click();
    }
};

/**
 * Sjekker at innsending krever bekreftelse, sender inn, og returnerer det som ble sendt
 */
export const sendInn = async (page: Page): Promise<MeldekortUtfyltDTO> => {
    await expect(page).toHaveURL(/send-inn$/);

    const bekreftVarsel = page.getByText(tekst('oppsummeringBekrefterFeil'));

    await knapp(page, 'sendInn').click();
    await expect(bekreftVarsel).toBeVisible();

    await checkbox(page, 'oppsummeringBekrefter').click();
    await expect(bekreftVarsel).toBeHidden();

    const sendInnRequest = page.waitForRequest((request) =>
        request.url().endsWith('/api/send-inn'),
    );
    await knapp(page, 'sendInn').click();
    await expect(page).toHaveURL(/kvittering$/);

    return (await sendInnRequest).postDataJSON();
};

export const antallDagerMedStatus = (innsendt: MeldekortUtfyltDTO, status: MeldekortDagStatus) =>
    innsendt.dager.filter((dag) => dag.status === status).length;

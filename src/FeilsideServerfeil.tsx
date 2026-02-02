import { BodyShort, Box, Heading, Link, List, Page, VStack } from '@navikt/ds-react';

export const FeilsideServerfeil = () => {
    return (
        <Page.Block as="main" width="xl" gutters>
            <Box paddingBlock="20 16">
                <VStack gap="16">
                    <VStack gap="12" align="start">
                        <div>
                            <Heading level="1" size="large" spacing>
                                Oisann, her gikk det galt!
                            </Heading>
                            <BodyShort>
                                Det har dessverre skjedd en feil hos oss. Vi jobber med saken. Du
                                kan prøve å laste inn siden på nytt, eller logge ut og prøve igjen
                                senere.
                            </BodyShort>
                            <List>
                                <List.Item>Bruk gjerne søket eller menyen</List.Item>
                                <List.Item>
                                    <Link href="#">Gå til forsiden</Link>
                                </List.Item>
                            </List>
                        </div>
                    </VStack>

                    <div>
                        <Heading level="2" size="large" spacing>
                            Something went wrong
                        </Heading>
                        <BodyShort spacing>
                            Unfortunately, an error has occurred on our part. We are working on the
                            issue. You can try reloading the page, or log out and try again later.
                        </BodyShort>
                        <BodyShort>
                            Go to the <Link href="#">front page</Link>, or use one of the links in
                            the menu.
                        </BodyShort>
                    </div>
                </VStack>
            </Box>
        </Page.Block>
    );
};

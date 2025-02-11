import path from 'path';
import { DecoratorEnvProps } from '@navikt/nav-dekoratoren-moduler';
import { injectDecoratorServerSide } from '@navikt/nav-dekoratoren-moduler/ssr';

const envProps: DecoratorEnvProps = { env: 'dev' };

export const getTemplateWithDecorator = async () => {
    const templatePath =
        process.env.NODE_ENV === 'development'
            ? path.resolve(process.cwd(), '..', 'index.html')
            : path.resolve(process.cwd(), 'dist', 'client', 'index.html');

    return injectDecoratorServerSide({
        ...envProps,
        filePath: templatePath,
        params: {
            simpleFooter: true,
        },
    });
};

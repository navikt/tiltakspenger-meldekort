import path from 'path';
import fs from 'fs';
import { DecoratorEnvProps } from '@navikt/nav-dekoratoren-moduler';
import { injectDecoratorServerSide } from '@navikt/nav-dekoratoren-moduler/ssr';

const envProps: DecoratorEnvProps = { env: 'dev' };

const getHtmlTemplate = () => {
    const templatePath =
        process.env.NODE_ENV === 'development'
            ? path.resolve(process.cwd(), '..', 'index.html')
            : path.resolve(process.cwd(), 'dist', 'client', 'index.html');

    return fs.readFileSync(templatePath, { encoding: 'utf-8' });
};

export const getTemplateWithDecorator = async () => {
    // const params = getDecoratorParams(locale);

    const templatePath =
        process.env.NODE_ENV === 'development'
            ? path.resolve(process.cwd(), '..', 'index.html')
            : path.resolve(process.cwd(), 'dist', 'client', 'index.html');

    return injectDecoratorServerSide({
        ...envProps,
        filePath: templatePath,
        params: {},
    });
};

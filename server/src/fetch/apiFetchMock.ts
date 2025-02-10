import { FetchFraApi } from '@fetch/apiFetch';
import { MeldekortDagStatus } from '@client/typer/meldekort-utfylling';
import { MeldekortTilBrukerDTO } from '@client/typer/meldekort-dto';
import dayjs from 'dayjs';

export const fetchFraApiMock: FetchFraApi = async (_1, path, _2, body) => {
    if (path === 'siste') {
        return mockResponse(200, mockMeldekort[0]);
    }

    if (path === 'alle') {
        return mockResponse(200, mockMeldekort);
    }

    if (path === 'send-inn') {
        const innsendtMeldekort = JSON.parse(body as string);
        const meldekort = mockMeldekort.find((mk) => mk.id === innsendtMeldekort?.id);

        if (!meldekort) {
            return mockResponse(500, null);
        }

        meldekort.dager = meldekort.dager.map((dag, index) => ({
            ...dag,
            status: innsendtMeldekort.dager[index].status,
        }));

        meldekort.innsendt = new Date().toISOString();

        return mockResponse(200, null);
    }

    if (path.startsWith('meldekort/')) {
        const meldekortId = path.split('/')[1];
        const meldekort = mockMeldekort.find((mk) => mk.id === meldekortId);
        return mockResponse(meldekort ? 200 : 404, meldekort);
    }

    return mockResponse(404, null);
};

const mockResponse = (status: number, body: any) =>
    ({
        status,
        ok: status >= 200 && status < 300,
        json: () => body,
    }) as unknown as ReturnType<typeof fetchFraApiMock>;

const formatDate = (date: string, plusDays: number = 0) => {
    return dayjs(date).add(plusDays, 'days').format('YYYY-MM-DD');
};

const mockMeldekort: MeldekortTilBrukerDTO[] = [
    {
        id: 'meldekort_2',
        meldeperiodeId: 'periode_2',
        versjon: 1,
        meldeperiodeKjedeId: 'kjede_2',
        fraOgMed: '2025-01-06',
        tilOgMed: '2025-01-19',
        maksAntallDager: 8,
        dager: [
            ...Array.from({ length: 10 }).map((_, i) => ({
                status: MeldekortDagStatus.IkkeRegistrert,
                harRett: true,
                dag: formatDate('2025-01-06', i),
            })),
            ...Array.from({ length: 4 }).map((_, i) => ({
                status: MeldekortDagStatus.IkkeRegistrert,
                harRett: false,
                dag: formatDate('2025-01-16', i),
            })),
        ],
    },
    {
        id: 'meldekort_1',
        meldeperiodeId: 'periode_1',
        versjon: 1,
        meldeperiodeKjedeId: 'kjede_1',
        fraOgMed: '2024-12-23',
        tilOgMed: '2025-01-05',
        innsendt: '2025-01-04T07:56:11.995Z',
        maksAntallDager: 10,
        dager: [
            ...Array.from({ length: 5 }).map((_, i) => ({
                status: MeldekortDagStatus.Deltatt,
                harRett: true,
                dag: formatDate('2024-12-23', i),
            })),
            ...Array.from({ length: 2 }).map((_, i) => ({
                status: MeldekortDagStatus.IkkeRegistrert,
                harRett: true,
                dag: formatDate('2024-12-28', i),
            })),
            {
                status: MeldekortDagStatus.FraværSyk,
                harRett: true,
                dag: formatDate('2024-12-30'),
            },
            {
                status: MeldekortDagStatus.FraværSyktBarn,
                harRett: true,
                dag: formatDate('2024-12-31'),
            },
            {
                status: MeldekortDagStatus.Deltatt,
                harRett: true,
                dag: formatDate('2025-01-01'),
            },
            {
                status: MeldekortDagStatus.FraværAnnet,
                harRett: true,
                dag: formatDate('2025-01-02'),
            },
            {
                status: MeldekortDagStatus.IkkeDeltatt,
                harRett: true,
                dag: formatDate('2025-01-03'),
            },
            ...Array.from({ length: 2 }).map((_, i) => ({
                status: MeldekortDagStatus.IkkeRegistrert,
                harRett: true,
                dag: formatDate('2025-01-04', i),
            })),
        ],
    },
];

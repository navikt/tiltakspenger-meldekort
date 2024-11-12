import Link from 'next/link';

type Props = {
    id: string;
    status: string;
};

export const EndringsLenke = ({ id, status }: Props) => {
    const endringsType = {
        sti: 'endre',
        tekst: 'rapportering-redigeringslenke-endre',
    };

    return <Link href={`/periode/${id}/${endringsType.sti}`}>{endringsType.tekst}</Link>;
};

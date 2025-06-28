import { getFullnodeUrl, SuiClient } from '@mysten/sui/client';

// Inisialisasi Sui Client untuk terhubung ke Mainnet
const client = new SuiClient({ url: getFullnodeUrl('testnet') });

// Tipe Struct yang ingin Anda cari
const PROPOSAL_TYPE = '0xefaa6e68ed27540f97b89a9b15c48f3e8b7b407ff49efc0f5ac52ca0d268b471::dashboard::Proposal';

async function fetchProposals() {
    console.log(`Mencari semua objek dengan tipe: ${PROPOSAL_TYPE}`);

    try {
        // Gunakan queryObjects untuk mencari semua objek dengan tipe yang cocok
        const response = await client.queryObjects({
            query: {
                Filter: {
                    StructType: PROPOSAL_TYPE,
                },
            },
            options: {
                showContent: true, // Pastikan untuk meminta kontennya!
                showOwner: true,
            },
        });

        if (response.data.length === 0) {
            console.log("Tidak ada objek Proposal yang ditemukan.");
            return;
        }

        console.log(`Ditemukan ${response.data.length} objek Proposal:`);

        // Loop melalui setiap objek dan tampilkan datanya
        response.data.forEach(proposalObject => {
            if (proposalObject.data && proposalObject.data.content && proposalObject.data.content.dataType === 'moveObject') {
                console.log('---');
                console.log(`Object ID: ${proposalObject.data.objectId}`);
                console.log('Konten (Fields):', proposalObject.data.content.fields);
                console.log('Pemilik (Owner):', proposalObject.data.owner);
                console.log('---');
            }
        });

    } catch (error) {
        console.error('Gagal mengambil data Proposal:', error);
    }
}



export default function Mantap() {
    console.log(fetchProposals())
    return (
        <div>Oke lah</div>
        
    )
}

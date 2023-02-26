import * as anchor from "@project-serum/anchor";
import { TapCash } from "../types/tap-cash";

export interface WorkSpace {
    connection: anchor.web3.Connection;
    provider: anchor.AnchorProvider;
    program: anchor.Program<TapCash>;
    payer: anchor.web3.Keypair;
}

interface WorkSpaceProps {
    endpoint: string;
    bankAuth: anchor.web3.Keypair;
}

export const getWorkspace = async (props: WorkSpaceProps): Promise<WorkSpace> => {
    const { endpoint, bankAuth } = props;
    const program = await anchor.workspace.TapCash as anchor.Program<TapCash>;
    //TODO add endpoint logic
    const connection = new anchor.web3.Connection(endpoint);
    // TODO FIX .env
    const anchorWallet = new anchor.Wallet(bankAuth);
    const provider: anchor.AnchorProvider = new anchor.AnchorProvider(
        connection,
        // fallback value allows querying the program without having a wallet connected
        anchorWallet ?? ({} as anchor.Wallet),
        anchor.AnchorProvider.defaultOptions()
    );
    const payer = bankAuth;

    return { connection, provider, program, payer };
}
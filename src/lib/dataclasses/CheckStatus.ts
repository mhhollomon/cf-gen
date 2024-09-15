export interface CheckStatus {
    name : string;
    status : string;
    message : string;
}

export type CheckStatusList =  CheckStatus[];

export function startingCheckStatus() : CheckStatusList {
    return [
        { name : 'consonant_outlines', status : 'UNKOWN', message : '' },
        { name : 'recover_leaps', status : 'UNKOWN', message : '' },
        { name : 'no_trills', status : 'UNKOWN', message : '' },
    
    ]
}
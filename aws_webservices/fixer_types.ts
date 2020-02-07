//The structure of a Rates object
interface FixerRates{
    USD: number,
    CAD: number,
    GBP: number
}

//The data structure returned in the message body by fixer.io
interface FixerObject {
    success: boolean,
    error?: FixerError,
    timestamp: number,
    historical: boolean,
    base: string,
    date: string,
    rates: FixerRates
}

//The data structure of a fixer.io error
interface FixerError{
    code: number,
    type: string,
    info: string,
}


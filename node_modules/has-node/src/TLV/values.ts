/**
 * @file Homekit Accessory Server TLV Values
 * @author MohammadHossein Abedinpour <abedinpourmh@gmail.com>
 * @licence Apache2
 */

export enum TLVMethods {
    pairSetup = 1,
    pairVerify = 2,
    addPairing = 3,
    removePairing = 4,
    listPairings = 5,
}

export enum TLVErrors {
    unknown = 0x01,
    authentication = 0x02,
    backOff = 0x03,
    maxPeers = 0x04,
    maxTries = 0x05,
    unavailable = 0x06,
    busy = 0x07
}

export enum TLVValues {
    method = 0x00,
    identifier = 0x01,
    salt = 0x02,
    publicKey = 0x03,
    proof = 0x04,
    encryptedData = 0x05,
    state = 0x06,
    error = 0x07,
    retryDelay = 0x08,
    certificate = 0x09,
    signature = 0x0A,
    permissions = 0x0B,
    fragmentData = 0x0C,
    fragmentLast = 0x0D,
    separator = 0xFF
}

export enum statusCodes {
    OK = 0,
    insufficientPrivilege = -70401,
    communicationError = -70402,
    busy = -70403,
    isReadonly = -70404,
    isWriteonly = -70405,
    notificationIsNotSupported = -70406,
    outOfResource = -70407,
    timedout = -70408,
    notFound = -70409,
    invalidValue = -70410,
    insufficientAuthoriation = -70411
}
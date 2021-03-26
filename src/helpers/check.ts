interface CheckScope {
  scopes: string[];
  requiredScopes: string[][];
}

export const checkScope = ({ scopes, requiredScopes }: CheckScope) => {
  if (!scopes || scopes.length === 0) {
    return false;
  }

  const hasScopes = requiredScopes.every((scopeData) => {
    for (const scope of scopes) {
      if (!scopeData.includes(scope)) {
        continue;
      }

      return true;
    }

    return false;
  });

  return hasScopes;
};

interface CheckValidBetweenTime {
  isoStartTime: Date;
  isoEndTime: Date;
}

export const checkValidBetweenTime = ({
  isoStartTime,
  isoEndTime,
}: CheckValidBetweenTime) => {
  if (!isoStartTime || !isoEndTime) {
    return false;
  }

  const startTime = Date.parse(isoStartTime.toString());
  const endTime = Date.parse(isoEndTime.toString());

  if (startTime >= endTime) {
    return false;
  }

  return true;
};

export const checkValidTime = ({ time }) => {
  if (!time || typeof time !== 'string' || !time.includes(':')) {
    return false;
  }

  const extractedNumberString = time.split(':');

  const checkIsNumber = extractedNumberString.every((each, index) => {
    if (index === 0) {
      return Number(each) >= 0;
    }

    return Number(each) >= 0 && Number(each) <= 60;
  });

  if (extractedNumberString.length !== 3 || !checkIsNumber) {
    return false;
  }

  return true;
};

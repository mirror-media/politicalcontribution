function joinMoneyBySeparator (moneyString) {
  return +(moneyString.split(',').join(''))
}
export { joinMoneyBySeparator }

export function toTenThousandNotation (money) {
  if (typeof money === 'string' && money.includes(',')) {
    money = joinMoneyBySeparator(money)
  }
  return (money / 10000).toFixed(2)
}

export function toOneHundredMillionNotation (money) {
  if (typeof money === 'string' && money.includes(',')) {
    money = joinMoneyBySeparator(money)
  }
  return (money / 100000000).toFixed(2)
}

export function calcAgeByBornYear (bornYear) {
  let currentYear = (new Date()).getFullYear()
  return currentYear - (+bornYear)
}

export function checkTruncate (string, length) {
  if (string.length >= length) {
    return string.substring(0, length) + '...'
  } else {
    return string
  }
}

export function getPartyAbbr (partyNameChinese) {
  if (partyNameChinese === '民主進步黨') {
    return 'dpp'
  } else if (partyNameChinese === '中國國民黨') {
    return 'kmt'
  } else if (partyNameChinese === '時代力量') {
    return 'npp'
  } else if (partyNameChinese === '無黨團結聯盟') {
    return 'npsu'
  } else if (partyNameChinese === '無黨籍') {
    return 'indie'
  }
}

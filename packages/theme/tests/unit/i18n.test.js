const de = require("../../lang/de");
const en = require("../../lang/en");

function sortAndCompare(arr1, arr2) {
    expect(arr1.sort()).toEqual(arr2.sort())
}

it('has the same i18n keys in all languages', () => {
    const keysDe = Object.keys(de);
    const keysEn = Object.keys(en);

    sortAndCompare(keysDe, keysEn);

    keysDe.forEach(key => {
        const nestedKeysDe = Object.keys(de[key]);
        const nestedKeysEn = Object.keys(en[key]);

        sortAndCompare(nestedKeysDe, nestedKeysEn);
    })
})

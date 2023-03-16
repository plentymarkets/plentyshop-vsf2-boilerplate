export interface Property {
    value: string,
    name: string
}

function getValue(property:Property): string {
  return property?.value;
}

function getName(property:Property): string {
  return property?.name;
}

export const propertyGetters = {
  getValue,
  getName
};

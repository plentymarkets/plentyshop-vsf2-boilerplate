import {VariationProperty, VariationPropertyGroup} from '@vue-storefront/plentymarkets-api';

function hasProperty(id:number, propertyGroups:VariationPropertyGroup[]): boolean {
    return !!getProperty(id, propertyGroups);
}

function getProperty(id:number, propertyGroups:VariationPropertyGroup[]): VariationProperty|null {
    for (let group of propertyGroups) {
        for (let property of group.properties) {
            if (property.id === id) {
                return property;
            }
        }
    }
    return null;
}

function getPropertyFromGroup(id:number, propertyGroup:VariationPropertyGroup): VariationProperty|null {
    for (let property of propertyGroup.properties) {
        if (property.id === id) {
            return property;
        }
    }
    return null;
}

function getProperties(propertyGroup:VariationPropertyGroup): VariationProperty[] {
    return propertyGroup?.properties;
}

function hasGroup(id: number, propertyGroups:VariationPropertyGroup[]): boolean {
    return !!getGroup(id, propertyGroups);
}

function getGroup(id: number, propertyGroups:VariationPropertyGroup[]): VariationPropertyGroup|null {
    for (let group of propertyGroups) {
        if (group.id === id) {
            return group;
        }
    }
    return null;
}

function getPropertyId(property:VariationProperty): number {
    return property?.id;
}

function getPropertyCast(property: VariationProperty): string {
    return property?.cast;
}

function getFileTypeOfValue(property: VariationProperty) {
    const propertyValue = getPropertyValue(property);
    return propertyValue.substring(propertyValue.lastIndexOf("."));
}

function isMP4File(property: VariationProperty): boolean {
    return (getPropertyCast(property) === "file" && getFileTypeOfValue(property) === "mp4");
}

function isImage(property: VariationProperty): boolean {
    return (isJpegFile(property) || isWebpFile(property));
}

function isWebpFile(property: VariationProperty): boolean {
    return (getPropertyCast(property) === "file" && getFileTypeOfValue(property) === "webp");
}

function isJpegFile(property: VariationProperty): boolean {
    return (getPropertyCast(property) === "file"
        && (getFileTypeOfValue(property) === "jpg" || getFileTypeOfValue(property) === "jpeg"));
}

function isHTML(property: VariationProperty): boolean {
    return getPropertyCast(property) === "html";
}

function isText(property: VariationProperty): boolean {
    return getPropertyCast(property) === "text";
}

function isYoutubeVideoId(property: VariationProperty): boolean {
    // Idea: If we had tags for properties it would be possible to identify youtube videos based on that.
    // As long as we don't have them, we could set a configuration that enables shop owners to define which
    // property (group) ids contain youtube video ids.
    // @todo: Remove hardcoded ids
    const propertyId = getPropertyId(property);
    return (propertyId === 29 || propertyId === 33);
}

function isVimeoVideoId(property: VariationProperty): boolean {
    // Idea: If we had tags for properties it would be possible to identify vimeo videos based on that.
    // As long as we don't have them, we could set a configuration that enables shop owners to define which
    // property (group) ids contain vimeo video ids.
    // @todo: Remove hardcoded ids
    const propertyId = getPropertyId(property);
    return (propertyId === 30 || propertyId === 34);
}

function getPropertyValue(property:VariationProperty): string {
  return property?.values?.value;
}

function getPropertyName(property:VariationProperty): string {
    return property?.names?.name;
}

function getPropertyNameDescription(property:VariationProperty): string {
    return property?.names?.description;
}

function getPropertyValueDescription(property:VariationProperty): string {
    return property?.values?.description;
}

function getPropertyValueId(property:VariationProperty): number {
    return property?.values?.id;
}

function getGroupId(propertyGroup:VariationProperty): number {
    return propertyGroup?.groupId;
}

function getGroupName(propertyGroup:VariationPropertyGroup): string {
    return propertyGroup?.name;
}

function getGroupDescription(propertyGroup:VariationPropertyGroup): string {
    return propertyGroup?.description;
}

export const propertyGetters = {
    hasProperty,
    getProperty,
    getPropertyFromGroup,
    getProperties,
    getPropertyId,
    getPropertyValue,
    getPropertyName,
    getPropertyNameDescription,
    getPropertyValueDescription,
    getPropertyValueId,
    isHTML,
    isImage,
    isJpegFile,
    isMP4File,
    isText,
    isVimeoVideoId,
    isWebpFile,
    isYoutubeVideoId,
    getGroup,
    getGroupId,
    getGroupName,
    getGroupDescription,
    getPropertyCast
};

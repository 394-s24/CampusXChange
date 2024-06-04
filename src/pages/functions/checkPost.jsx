export default function checkPost(e, tags) {
    if (tags.length == 0) {
        return false
    } else {
        try {
            const classValue = e.target.class.value;
            const conditionValue = e.target.condition.value;
            const descriptionValue = e.target.description.value;
            const editionValue = e.target.edition.value;
            const nameValue = e.target.name.value;
            const priceValue = e.target.price.value;
            return true
        } catch {
            return false
        }
    }
}
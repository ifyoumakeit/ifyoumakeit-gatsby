// TODO: Remove and add to new category_type table
export default function getCategoryPostSlug(category) {
  if ([1, 2, 3, 4, 7, 19].includes(category.cat_id)) {
    return "video";
  }

  if (category.cat_id === 20) {
    return "shop";
  }

  // Remove "s"
  return category.cat_slug.slice(0, category.cat_slug.length - 1);
}

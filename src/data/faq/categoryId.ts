export function faqCategoryId(category: string) {
  return category.toLowerCase().replace(/&/g, 'dan').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

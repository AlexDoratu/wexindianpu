function mapProduct(raw) {
  return {
    id: raw.id,
    name: raw.name,
    category: raw.category,
    price: raw.price,
    sales: raw.sales || 0,
    fabric: raw.fabric || '',
    tags: raw.tags || [],
    intro: raw.intro || '',
    image: raw.image || '',
    recommend: !!raw.recommend,
    isNew: !!raw.isNew
  };
}

module.exports = { mapProduct };

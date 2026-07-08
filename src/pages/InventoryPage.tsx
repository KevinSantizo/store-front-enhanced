import { mockProducts } from "../data/mockProducts";

export function InventoryPage() {
  return (
    <section className="card">
      <h2>Inventario</h2>
      <p>Stock disponible en Sucursal Principal.</p>

      <div className="inventory-grid">
        {mockProducts.map((product) => (
          <article key={product.id} className="inventory-card">
            <strong>{product.name}</strong>
            <span>{product.internalCode}</span>
            <h3>
              {product.stock} {product.baseUnit}
            </h3>
          </article>
        ))}
      </div>
    </section>
  );
}
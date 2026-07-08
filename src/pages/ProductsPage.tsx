import { mockProducts } from "../data/mockProducts";

export function ProductsPage() {
  return (
    <section className="card">
      <h2>Productos</h2>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Código interno</th>
              <th>Código de barras</th>
              <th>Producto</th>
              <th>Categoría</th>
              <th>Stock</th>
            </tr>
          </thead>

          <tbody>
            {mockProducts.map((product) => (
              <tr key={product.id}>
                <td>{product.internalCode}</td>
                <td>{product.barcode || "Sin código"}</td>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>
                  {product.stock} {product.baseUnit}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
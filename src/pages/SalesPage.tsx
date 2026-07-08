import { useMemo, useState } from "react";
import { mockProducts } from "../data/mockProducts";
import { useCartStore } from "../store/cartStore";


    export function SalesPage() {
        const [search, setSearch] = useState("");

        const cart = useCartStore((state) => state.cart);
        const amountReceived = useCartStore((state) => state.amountReceived);

        const addProduct = useCartStore((state) => state.addProduct);
        const updateQuantity = useCartStore((state) => state.updateQuantity);
        const changeQuantity = useCartStore((state) => state.changeQuantity);
        const updateDiscount = useCartStore((state) => state.updateDiscount);
        const updatePresentation = useCartStore((state) => state.updatePresentation);
        const removeItem = useCartStore((state) => state.removeItem);
        const clearCart = useCartStore((state) => state.clearCart);
        const setAmountReceived = useCartStore((state) => state.setAmountReceived);

        const filteredProducts = useMemo(() => {
            const value = search.trim().toLowerCase();

            if (!value) return mockProducts;

            return mockProducts.filter((product) => {
            return (
                product.name.toLowerCase().includes(value) ||
                product.internalCode.toLowerCase().includes(value) ||
                product.barcode?.toLowerCase().includes(value)
            );
            });
        }, [search]);

        const subtotal = cart.reduce((acc, item) => {
            return acc + item.quantity * item.presentation.price;
        }, 0);

        const discount = cart.reduce((acc, item) => {
            const lineSubtotal = item.quantity * item.presentation.price;
            return acc + (lineSubtotal * item.discountPercent) / 100;
        }, 0);

        const total = subtotal - discount;
        const change = amountReceived > total ? amountReceived - total : 0;

        return (
            <div className="page-grid">
            <section className="card sales-main">
                <div className="card-header">
                <div>
                    <h2>Nueva venta</h2>
                    <p>Busca productos por nombre, código interno o código de barras.</p>
                </div>

                <button className="btn btn-outline" onClick={clearCart}>
                    Vaciar carrito
                </button>
                </div>

                <div className="search-box">
                <input
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Buscar producto..."
                />
                </div>

                <div className="product-list">
                {filteredProducts.map((product) => (
                    <button
                    key={product.id}
                    className="product-button"
                    onClick={() => addProduct(product)}
                    >
                    <strong>{product.name}</strong>
                    <span>{product.internalCode}</span>
                    <small>Stock: {product.stock} {product.baseUnit}</small>
                    </button>
                ))}
                </div>

                <div className="table-wrapper">
                <table>
                    <thead>
                    <tr>
                        <th>Producto</th>
                        <th>Presentación</th>
                        <th>Cantidad</th>
                        <th>Precio</th>
                        <th>Desc. %</th>
                        <th>Total</th>
                        <th></th>
                    </tr>
                    </thead>

                    <tbody>
                    {cart.length === 0 && (
                        <tr>
                        <td colSpan={7} className="empty-cell">
                            No hay productos agregados.
                        </td>
                        </tr>
                    )}

                    {cart.map((item, index) => {
                        const lineSubtotal = item.quantity * item.presentation.price;
                        const lineDiscount =
                        (lineSubtotal * item.discountPercent) / 100;
                        const lineTotal = lineSubtotal - lineDiscount;

                        return (
                        <tr key={`${item.product.id}-${index}`}>
                            <td>
                            <strong>{item.product.name}</strong>
                            <br />
                            <span>{item.product.internalCode}</span>
                            </td>

                            <td>
                            <select
                                value={item.presentation.id}
                                onChange={(event) =>
                                updatePresentation(index, Number(event.target.value))
                                }
                            >
                                {item.product.presentations.map((presentation) => (
                                <option key={presentation.id} value={presentation.id}>
                                    {presentation.name}
                                </option>
                                ))}
                            </select>
                            </td>

                            <td>
                                <div className="quantity-control">
                                    <button type="button" onClick={() => changeQuantity(index, -1)}>
                                    -
                                    </button>

                                    <input
                                    type="number"
                                    min="1"
                                    step="1"
                                    value={item.quantity}
                                    onChange={(event) =>
                                        updateQuantity(index, Number(event.target.value))
                                    }
                                    />

                                    <button type="button" onClick={() => changeQuantity(index, 1)}>
                                    +
                                    </button>
                                </div>
                            </td>

                            <td>Q{item.presentation.price.toFixed(2)}</td>

                            <td>
                            <input
                                type="number"
                                min="0"
                                max="100"
                                step="1"
                                placeholder="0"
                                value={item.discountPercent === 0 ? "" : item.discountPercent}
                                onChange={(event) => updateDiscount(index, event.target.value)}
                            />
                            </td>

                            <td>Q{lineTotal.toFixed(2)}</td>

                            <td>
                            <button
                                className="btn-icon"
                                onClick={() => removeItem(index)}
                            >
                                X
                            </button>
                            </td>
                        </tr>
                        );
                    })}
                    </tbody>
                </table>
                </div>
            </section>

            <aside className="card payment-card">
                <h2>Resumen</h2>

                <div className="summary-row">
                <span>Subtotal</span>
                <strong>Q{subtotal.toFixed(2)}</strong>
                </div>

                <div className="summary-row discount">
                <span>Descuento</span>
                <strong>Q{discount.toFixed(2)}</strong>
                </div>

                <div className="summary-total">
                <span>Total</span>
                <strong>Q{total.toFixed(2)}</strong>
                </div>

                <label className="field">
                <span>Efectivo recibido</span>
                <input
                    type="number"
                    value={amountReceived}
                    onChange={(event) => setAmountReceived(Number(event.target.value))}
                />
                </label>

                <div className="change-box">
                <span>Cambio</span>
                <strong>Q{change.toFixed(2)}</strong>
                </div>

                <button className="btn btn-primary" disabled={cart.length === 0}>
                Cobrar venta
                </button>
            </aside>
            </div>
        );
    }
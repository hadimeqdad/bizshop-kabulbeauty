import { useCart } from "@/lib/cart";
import { useLang } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

const Cart = () => {
  const { items, remove, clear } = useCart();
  const { lang } = useLang();

  const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);

  const waMessage = items
    .map((i) => `- ${i.name[lang]} x${i.qty} = ${(i.price * i.qty).toLocaleString()} افغانی`)
    .join("\n");

  const waLink = `whatsapp://send?phone=93787628812&text=سلام، می‌خوام این محصولات رو سفارش بدم:\n${waMessage}\n\nمجموع: ${total.toLocaleString()} افغانی`;

  if (items.length === 0) {
    return (
      <section className="container py-16 text-center">
        <div className="text-5xl mb-4">🛒</div>
        <h2 className="font-display text-2xl text-primary mb-4">سبد خرید خالی است</h2>
        <Link to="/shop">
          <Button>ادامه خرید</Button>
        </Link>
      </section>
    );
  }

  return (
    <section className="container py-8 max-w-2xl">
      <h1 className="font-display text-3xl text-primary mb-6">🛒 سبد خرید</h1>

      <div className="bg-card border border-border rounded-lg overflow-hidden mb-6">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-4 p-4 border-b border-border last:border-0">
            {item.image && (
              <img src={item.image} alt={item.name[lang]} className="w-16 h-16 object-cover rounded" />
            )}
            <div className="flex-1">
              <p className="font-medium text-sm">{item.name[lang]}</p>
              <p className="text-xs text-muted-foreground">{item.price.toLocaleString()} افغانی × {item.qty}</p>
            </div>
            <p className="font-semibold text-sm">{(item.price * item.qty).toLocaleString()} افغانی</p>
            <button onClick={() => remove(item.id)} className="text-destructive">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between mb-6 px-2">
        <span className="font-bold text-lg">مجموع:</span>
        <span className="font-bold text-lg text-primary">{total.toLocaleString()} افغانی</span>
      </div>

      <a href={waLink} className="block w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 rounded-xl text-center text-lg mb-3">
        📲 سفارش از واتساپ
      </a>

      <div className="flex gap-2">
        <Link to="/shop" className="flex-1">
          <Button variant="outline" className="w-full">ادامه خرید</Button>
        </Link>
        <Button variant="ghost" onClick={clear} className="text-destructive">پاک کردن سبد</Button>
      </div>
    </section>
  );
};

export default Cart;

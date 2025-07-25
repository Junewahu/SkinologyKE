import { products } from "@/shop/products";
import PaymentStub from "@/shop/PaymentStub";
import AffiliateLink from "@/components/AffiliateLink";

export default function Shop() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <div key={product.id} className="border rounded-lg p-4 flex flex-col">
          <div className="font-bold text-lg mb-2">{product.name}</div>
          <div className="mb-2">KSh {product.price}</div>
          {product.affiliate ? (
            <AffiliateLink href={product.link || "#"}>Buy via Affiliate</AffiliateLink>
          ) : (
            <PaymentStub amount={product.price} />
          )}
        </div>
      ))}
    </div>
  );
}
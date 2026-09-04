import Image from "next/image";
import { categories } from "@/lib/data";

export default function CategoryGrid() {
  return (
    <>
      <h2>Discover Our Products</h2>
      <div className="categories">
        {categories.map((cat) => (
          <a href="#" key={cat.slug}>
            <Image src={cat.image} alt={cat.name} width={350} height={300} />
          </a>
        ))}
      </div>
    </>
  );
}

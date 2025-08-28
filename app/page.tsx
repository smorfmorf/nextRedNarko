import { Container } from "@/components/container";
import { Filters } from "@/components/filters";
import { ProductsGroupList } from "@/components/products-group-list";
import { Title } from "@/components/title";
import { TopBar } from "@/components/topbar";

export default function Home() {
  return (
    <div className="px-4">
      <Container className="mt-10">
        <Title text="Все draggi..." size="lg" className="font-extrabold" />
      </Container>
      <TopBar />

      <Container className="mt-10 pb-10">
        <div className="flex gap-[60px]">
          {/* Фильтрация-левая часть */}
          <div className="w-[250px] border-r-2">
            <Filters />
          </div>

          {/* Посты, отдельный компонент который будет рендерить группу продуктов - ProductsGroupList */}
          <div className="flex-1">
            <div className="grid gap-16">
              <ProductsGroupList
                title="Драги"
                categoryId={1}
                items={[{ id: 1, price: 666, name: "КокиОтСмоки" }]}
              />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

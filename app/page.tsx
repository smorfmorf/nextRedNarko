import { Container } from "@/components/container";
import { Filters } from "@/components/filters";
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

          {/* Посты */}
          <div className="flex-1">
            <div className="grid gap-16">
              <div className="grid grid-cols-4 gap-4 place-items-center">
                <div>post 1</div>
                <div>post 1</div>
                <div>post 1</div>
                <div>post 1</div>
              </div>

              <div className="grid grid-cols-4 gap-4 place-items-center">
                <div>post 1</div>
                <div>post 1</div>
                <div>post 1</div>
                <div>post 1</div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

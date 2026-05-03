import { InfoBlock } from "@/components/info-block";
import { ProfileForm } from "@/components/profile-user-acc";
import { getUserSession } from "@/lib/get-user-session";
import prisma from "@/prisma/prisma.client";

export default async function ProfilePage() {
    const userSession = await getUserSession();
    console.log("userSession: ", userSession);

    if (!userSession) {
        return (
            <div className="flex flex-col items-center justify-center mt-5">
                <InfoBlock
                    title="Доступ запрещён"
                    text="Данную страницу могут просматривать только авторизованные пользователи"
                    imageUrl="/lock.png"
                />
            </div>
        );
    }

    const user = await prisma.user.findFirst({
        where: {
            id: Number(userSession.id),
        },
    });
    const order = await prisma.order.findMany({
        where: {
            userId: Number(userSession.id),
        },
    });

    if (!user) {
        return (
            <div className="flex flex-col items-center justify-center mt-5">
                <InfoBlock
                    title="Доступ запрещён"
                    text="Данную страницу могут просматривать только авторизованные пользователи"
                    imageUrl="/lock.png"
                />
            </div>
        );
    }

    return <ProfileForm data={user} order={order} />;
}

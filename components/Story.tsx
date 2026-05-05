"use client";
import { cn } from "@/lib/utils";
import { Api, Interface_Story } from "@/services/api-client";
import React from "react";
import { Container } from "./container";
import { X } from "lucide-react";
import ReactStories from "react-insta-stories";

interface Props {
    className?: string;
}

export const StoryComponent: React.FC<Props> = ({ className }) => {
    const [stories, setStories] = React.useState<Interface_Story[]>([]);
    const [open, setOpen] = React.useState(false);
    const [selectedStory, setSelectedStory] = React.useState<Interface_Story | null>(null);

    React.useEffect(() => {
        async function fetchStorys() {
            const data = await Api.storys.getAllStorys();
            setStories(data);
        }

        fetchStorys();
    }, []);

    function onClickStory(story: Interface_Story) {
        setSelectedStory(story);

        if (story.items.length > 0) {
            setOpen(true);
        }
    }

    React.useEffect(() => {
        if (open) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        return () => {
            document.body.style.overflow = "";
        };
    }, [open]);

    return (
        <>
            <Container className={cn("flex items-center justify-between gap-2 my-2", className)}>
                {stories.length === 0 &&
                    [...Array(6)].map((_, index) => (
                        <div key={index} className="w-[200px] h-[250px] bg-gray-200 rounded-md animate-pulse" />
                    ))}

                {stories.map((story) => (
                    <img
                        key={story.id}
                        onClick={() => onClickStory(story)}
                        className="rounded-md cursor-pointer"
                        height={250}
                        width={200}
                        src={story.previewImageUrl}
                    />
                ))}

                {open && (
                    <div className="absolute left-0 top-0 w-full h-screen bg-black/80 flex items-center justify-center z-30">
                        <div className="relative" style={{ width: 520 }}>
                            <button className="absolute -right-10 -top-5 z-30" onClick={() => setOpen(false)}>
                                <X className="absolute top-0 right-0 w-8 h-8 text-white/50" />
                            </button>

                            <ReactStories
                                onAllStoriesEnd={() => setOpen(false)}
                                stories={selectedStory?.items.map((item) => ({ url: item.sourceUrl })) || []}
                                defaultInterval={3000}
                                width={520}
                                height={800}
                            />
                        </div>
                    </div>
                )}
            </Container>
        </>
    );
};

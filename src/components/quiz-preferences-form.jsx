"use client";
import { generateMCQs } from "@/actions/mock-practice";
import { getUserDetails } from "@/actions/user-actions";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DataContext } from "@/context/data-context";
import { mcqSchema } from "@/lib/schemas/mcq-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { DiamondPlus, Trophy } from "lucide-react";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

export function QuizPreferencesForm() {
  const router = useRouter();
  const { setData } = useContext(DataContext);

  const [skills, setSkills] = useState([]);

  const form = useForm({
    resolver: zodResolver(mcqSchema),
    defaultValues: {
      quizType: "multiple-choice",
      skills: [],
      totalQuestions: "10",
      level: "BEGINNER",
    },
  });

  const mutation = useMutation({
    mutationFn: generateMCQs,
    onSuccess: ({ questions, topic }) => {
      if (questions.length < 1) {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
        });
        return;
      }
      setData({ questions, topic });
      router.push("/assessments/mcqs");
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Failed to generate MCQs",
        description: error.message,
      });
    },
  });

  const onSubmit = async (values) => {
    const data = {
      length: values.totalQuestions,
      quizType: values.quizType,
      level: values.level,
      skills: values.skills,
    };
    mutation.mutate(data);
  };

  useEffect(() => {
    async function fetchUserDetails() {
      const userDetails = await getUserDetails();

      if (userDetails.skills.length > 0) {
        setSkills(userDetails.skills);
      }
    }

    fetchUserDetails();
  }, []);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          Create Quiz <DiamondPlus />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            Create a New Quiz <Trophy className="size-4" />
          </DialogTitle>
          <DialogDescription>
            Customize your quiz preferences below.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="quizType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quiz Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select quiz type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="multiple-choice">
                        Multiple Choice (MCQs)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="skills"
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel className="text-base">Skills</FormLabel>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {skills.map((skill, idx) => (
                      <FormField
                        key={idx}
                        control={form.control}
                        name="skills"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={idx}
                              className="flex flex-row items-start space-x-3 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(skill)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...field.value, skill])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== skill
                                          )
                                        );
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">
                                {skill}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="totalQuestions"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Total Questions</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select number of questions" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {[5, 10, 15, 20, 25].map((num) => (
                        <SelectItem key={num} value={num.toString()}>
                          {num}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="level"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Difficulty Level</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select difficulty level" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="BEGINNER">Beginner</SelectItem>
                      <SelectItem value="INTERMEDIATE">Intermediate</SelectItem>
                      <SelectItem value="ADVANCED">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? "Generating..." : "Start Practice"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

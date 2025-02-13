"use client";

import { sampleResumeData } from "@/data/sample-resume";
import TemplateOne from "./resume/templates/template-1";
import ResumeTemplate from "./resume/templates/template-2";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { useState } from "react";
import Image from "next/image";

const ResumePreview = () => {
  const [activeTab, setActiveTab] = useState("templateOne");
  return (
    <div>
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="flex gap-8 items-start"
      >
        <div>
          <TabsList className="flex-col h-auto">
            <TabsTrigger value="templateOne">
              <Image
                src="/resume-dummy.png"
                alt="resume"
                width={100}
                height={100}
              />
              {/* templateOne */}
            </TabsTrigger>
            <TabsTrigger value="templateTwo">
              <Image
                src="/resume-dummy.png"
                alt="resume"
                width={100}
                height={100}
              />
              {/* templateTwo */}
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="mx-auto">
          <TabsContent value="templateOne" className="col-span-2">
            <TemplateOne resumeData={sampleResumeData} />
          </TabsContent>
          <TabsContent value="templateTwo" className="col-span-2">
            <ResumeTemplate resume={sampleResumeData} />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default ResumePreview;

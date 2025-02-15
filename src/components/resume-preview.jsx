"use client";

import Image from "next/image";
import { useState } from "react";
import TemplateOne from "./resume/templates/template-1";
import ResumeTemplate from "./resume/templates/template-2";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

const ResumePreview = ({ resume, templateOneRef, templateTwoRef }) => {
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
                src="/resume-template-1.png"
                alt="resume-template-1"
                width={100}
                height={100}
              />
            </TabsTrigger>
            <TabsTrigger value="templateTwo">
              <Image
                src="/resume-template-2.png"
                alt="resume-template-2"
                width={100}
                height={100}
              />
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="mx-auto flex gap-1 items-start">
          <TabsContent value="templateOne" className="col-span-2">
            <TemplateOne resume={resume} ref={templateOneRef} />
          </TabsContent>
          <TabsContent value="templateTwo" className="col-span-2">
            <ResumeTemplate resume={resume} ref={templateTwoRef} />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default ResumePreview;

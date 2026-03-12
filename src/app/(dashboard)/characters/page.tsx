import React from "react";
import { CharacterRoster } from "@/components/characters/CharacterRoster";
import { RelationshipMap } from "@/components/characters/RelationshipMap";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function CharactersPage() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-wf-text">Character Studio</h1>
        <p className="text-sm text-wf-text-muted">Build, manage, and explore your cast of characters.</p>
      </div>
      <Tabs defaultValue="roster">
        <TabsList>
          <TabsTrigger value="roster">Roster</TabsTrigger>
          <TabsTrigger value="relationships">Relationships</TabsTrigger>
        </TabsList>
        <TabsContent value="roster" className="mt-4">
          <CharacterRoster />
        </TabsContent>
        <TabsContent value="relationships" className="mt-4">
          <RelationshipMap />
        </TabsContent>
      </Tabs>
    </div>
  );
}

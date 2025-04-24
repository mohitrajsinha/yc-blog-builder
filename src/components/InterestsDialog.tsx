import React, { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, X, Loader2 } from "lucide-react";
import { useInterestsStore } from "@/hooks/useInterestsStore";

const InterestsDialog = () => {
  const { 
    interests, 
    selectedInterests, 
    addInterest, 
    removeInterest, 
    setHasSelectedInterests,
    fetchSearchResults,
    isLoading
  } = useInterestsStore();
  
  const [localSelected, setLocalSelected] = useState<string[]>([]);
  
  useEffect(() => {
    setLocalSelected(selectedInterests.map(interest => interest.id));
  }, [selectedInterests]);

  const toggleInterest = (interest: { id: string; name: string }) => {
    if (localSelected.includes(interest.id)) {
      setLocalSelected(localSelected.filter(id => id !== interest.id));
      removeInterest(interest.id);
    } else {
      setLocalSelected([...localSelected, interest.id]);
      addInterest(interest);
    }
  };

  const handleContinue = async () => {
    if (localSelected.length > 0) {
      await fetchSearchResults();
      setHasSelectedInterests(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70">
      <div className="relative bg-card w-full max-w-md rounded-lg shadow-lg p-6 animate-fade-in">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Select Your Interests
          </h2>
          <p className="text-muted-foreground">
            Choose at least one topic that interests you to personalize your experience.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-6">
          {interests.map((interest) => (
            <Button
              key={interest.id}
              variant={localSelected.includes(interest.id) ? "default" : "outline"}
              className={`h-auto py-3 px-4 flex items-center justify-center ${
                localSelected.includes(interest.id) ? "bg-yc-orange hover:bg-yc-orange-dark" : ""
              }`}
              onClick={() => toggleInterest(interest)}
            >
              {localSelected.includes(interest.id) && (
                <Check className="mr-1 h-4 w-4" />
              )}
              {interest.name}
            </Button>
          ))}
        </div>

        <div className="flex flex-col gap-2">
          <Button
            onClick={handleContinue}
            disabled={localSelected.length === 0 || isLoading}
            className="w-full bg-yc-orange hover:bg-yc-orange-dark text-white"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Loading...
              </>
            ) : (
              'Continue to Lens'
            )}
          </Button>
          {localSelected.length === 0 && (
            <p className="text-sm text-center text-muted-foreground">
              Please select at least one interest to continue
            </p>
          )}
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {localSelected.length > 0 && (
            <div className="text-sm text-muted-foreground mb-2 w-full">
              Selected topics:
            </div>
          )}
          {localSelected.map((id) => {
            const interest = interests.find((i) => i.id === id);
            if (!interest) return null;
            
            return (
              <Badge
                key={interest.id}
                variant="secondary"
                className="flex items-center gap-1"
              >
                {interest.name}
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => toggleInterest(interest)}
                />
              </Badge>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default InterestsDialog;


import React from "react";
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import ComplexitySlider from "../components/ComplexitySlider";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const ComplexitySettings = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <Link 
        to="/" 
        className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-yc-orange transition-colors mb-6"
      >
        <ChevronLeft size={16} className="mr-1" />
        Back to home
      </Link>
      
      <Card>
        <CardHeader>
          <CardTitle>Content Complexity Settings</CardTitle>
          <CardDescription>
            Adjust the complexity level of article content across the site.
            Changes will apply to all articles you read.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ComplexitySlider articleId="global" />
          
          <div className="mt-6 space-y-4 text-sm">
            <div>
              <h4 className="font-medium">Level 1 (Simple)</h4>
              <p className="text-gray-600 dark:text-gray-400">
                Basic vocabulary and concepts. Perfect for beginners or quick understanding.
              </p>
            </div>
            
            <div>
              <h4 className="font-medium">Level 2</h4>
              <p className="text-gray-600 dark:text-gray-400">
                Slightly more detailed with some technical terms explained.
              </p>
            </div>
            
            <div>
              <h4 className="font-medium">Level 3 (Default)</h4>
              <p className="text-gray-600 dark:text-gray-400">
                Original article as written by the author.
              </p>
            </div>
            
            <div>
              <h4 className="font-medium">Level 4</h4>
              <p className="text-gray-600 dark:text-gray-400">
                Enhanced with additional technical details and deeper analysis.
              </p>
            </div>
            
            <div>
              <h4 className="font-medium">Level 5 (Advanced)</h4>
              <p className="text-gray-600 dark:text-gray-400">
                Expert level with specialized terminology and comprehensive analysis.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ComplexitySettings;

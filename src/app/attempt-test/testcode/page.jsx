"use client";

import starsBg from "@/assets/stars.png"

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'react-toastify';
import { useUser } from '@clerk/nextjs'
  const TestCodeEntry = () => {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`http://localhost:5000/api/tests/code/${code}`);
      if (response.ok) {
        const data = await response.json();
        router.push(`/attempt-test/${data.testId}`);
      } else {
        toast.error('Invalid test code');
      }
    } catch (error) {
      toast.error('Error finding test');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 text-black"  style={{
      backgroundImage: `url(${starsBg.src})`,
    }}>
      <div className="max-w-md w-full bg-zinc-200 rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold text-center mb-6">Enter Test Code</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              type="text"
              placeholder="Enter your test code"
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              className="w-full"
              maxLength={6}
            />
          </div>
          
          <Button
            type="submit"
            className="w-full bg-purple-900"
            disabled={loading || code.length !== 6}
          >
            {loading ? 'Finding Test...' : 'Start Test'}
          </Button>
        </form>
      </div>
    </div>
  );
};


export default TestCodeEntry;
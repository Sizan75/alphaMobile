import React from 'react';
import { useState } from 'react';
const Blogs = () => {
    const Item = ({ title, children }) => {
        const [isOpen, setIsOpen] = useState(false);
        return (
            <div className="border rounded shadow-sm">
                <button
                    type="button"
                    aria-label="Open item"
                    title="Open item"
                    className="flex items-center justify-between w-full p-4 focus:outline-none"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <p className="text-lg font-medium">{title}</p>
                    <div className="flex items-center justify-center w-8 h-8 border rounded-full">
                        <svg
                            viewBox="0 0 24 24"
                            className={`w-3 text-gray-600 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''
                                }`}
                        >
                            <polyline
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeMiterlimit="10"
                                points="2,7 12,17 22,7"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </div>
                </button>
                {isOpen && (
                    <div className="p-4 pt-0">
                        <p className="text-gray-700">{children}</p>
                    </div>
                )}
            </div>
        );
    };
    return (
        <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20 ">
            <div className="max-w-xl sm:mx-auto lg:max-w-2xl">
                <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">

                    <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
                        <span className="relative text-green-600">Question and Answer</span>
                    </h2>
                </div>
                <div className="space-y-4">
                    <Item title="What are the different ways to manage a state in a React application?">
                        When we talk about state in our applications, it's important to be clear about what types of state actually matter.

                        There are four main types of state you need to properly manage in your React apps:
<br/>
                        Local state
     <br/>
                        Global state
          <br/>
                        Server state
               <br/>
                        URL state

                    </Item>
                    <Item title="How does prototypical inheritance work?">
                    The Prototypal Inheritance is a feature in javascript used to add methods and properties in objects. It is a method by which an object can inherit the properties and methods of another object. Traditionally, in order to get and set the [[Prototype]] of an object, we use Object. getPrototypeOf and Object
                    </Item>
                    <Item title=" What is a unit test? Why should we write unit tests?">
                    The main objective of unit testing is to isolate written code to test and determine if it works as intended. Unit testing is an important step in the development process, because if done correctly, it can help detect early flaws in code which may be more difficult to find in later testing stages.
                    </Item>
                    <Item title="React vs. Angular vs. Vue?">
                    Vue provides higher customizability and hence is easier to learn than Angular or React. Further, Vue has an overlap with Angular and React with respect to their functionality like the use of components. Hence, the transition to Vue from either of the two is an easy option
                    </Item>
                </div>
            </div>
        </div>
    );
};

export default Blogs;
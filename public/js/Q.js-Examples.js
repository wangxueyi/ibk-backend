//To run Q.js examples:

    // 1. Open a new browser tab in Chrome and turn on developer toolbar.
    // 2. Copy/Paste this gist in the console and hit enter to run all the snippets.

// Based on the inspiration from samples @ https://github.com/kriskowal/q

////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////

// Set some global helpers and download Q.js

var module = {};

//Promise stubs
    // The following stubs simulate asynchronous operations that return Q.js promises.
    // All test cases are dependent on these stubs.

// This stub returns a promise which will get resolved after a delay
// p_id -> unique identifier
// p_ret -> return this valeue when resolved
// p_delay -> custom delay
var getResolvedPromise = function(logger, p_ret, p_delay) {
    var deferred = Q.defer();

    Q.delay(p_delay || 30)
     .done(function() {
        logger.log("(resolving the promise)");
        deferred.resolve(p_ret);
     });

    return deferred.promise;
}

// This stub returns a promise which will get rejected after a delay
// p_id -> unique identifier
// p_ret -> return this value when rejected in Error object
// p_delay -> custom delay
var getRejectedPromise = function(logger, p_ret, p_delay) {
    var deferred = Q.defer();

    Q.delay(p_delay || 30)
     .done(function() {
        logger.log("(rejecting the promise)");
        deferred.reject(new Error(p_ret || "promise rejected"));
     });

    return deferred.promise;
}

// This stub returns a promise which will neither resolve/reject but
// throws an unhandled exception after some delay
// p_id -> unique identifier
// p_delay -> custom delay
var getExceptionPromise = function(logger, p_ret, p_delay) {
    var deferred = Q.defer();

    Q.delay(p_delay || 30)
     .done(function() {
        throw new Error("throwing unhandled exception");
      });

    return deferred.promise;
}

var TestRunnerReady = (function() {
    var testcases = 1;
    return function(testcaseId, pushFurther) {
       // takes in the testcaseid and ensures the tests are run staggered
       // so all related messages are grouped in the console.
       testcases += pushFurther ? 2 : 1;
       return Q.delay(testcases++ * 100)
               .thenResolve({
                    log: function(p_msg, addBlankLine) {
                            if (typeof p_msg === "string") {
                                addBlankLine && console.log("");
                                console.log("%s : %s", (testcaseId || ""), p_msg);
                            } else {
                                console.log(p_msg);
                            }
                          },
                      group: function(p_msg) {
                        console.log("");
                        console.groupEnd();
                        console.group(p_msg);
                      }
                    });
    }
})();


/*
// Download Q.js
(function() {
    var jsFile = document.createElement('script')
    jsFile.setAttribute("type","text/javascript")
    jsFile.setAttribute("src", "//cdnjs.cloudflare.com/ajax/libs/q.js/0.9.6/q.js");
    jsFile.setAttribute("onload", "console.log('Q.js downloaded'); runQjsExamples();");
    document.getElementsByTagName("head")[0].appendChild(jsFile);
})();

*/
////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////

function runQjsExamples() {

    // Test cases

    TestRunnerReady().then(function(logger) {
        logger.group("1. promise.then, promise.fail");
    });


    TestRunnerReady("Test Case 1.1").then(function(logger) {
        logger.log("promise.then with resolved promise.", true);
        getResolvedPromise(logger, ["return_obj"])
            .then(function(res) {
                logger.log("in promise success handler -");
                logger.log(res);
            }, function (err) {
                logger.log(err);
            });
    });

    TestRunnerReady("Test Case 1.2").then(function(logger) {
        logger.log("promise.then with rejected promise.", true);
        getRejectedPromise(logger)
            .then(function(res) {
                logger.log(res);
            }, function (err) {
                logger.log("in promise error handler -");
                logger.log(err);
            });
    });

    TestRunnerReady("Test Case 1.3").then(function(logger) {
        logger.log("promise.then, promise.fail with rejected promise.", true);
        getRejectedPromise(logger)
            .fail(function (err) {
                logger.log("in promise error handler -");
                logger.log(err);
            });
    });

    TestRunnerReady("Test Case 1.4").then(function(logger) {
        logger.log("unhandled exception in promise.then handler", true);
        getResolvedPromise(logger)
            .then(function(res) {
                logger.log("throwing error in then");
                throw new Error("error in then handler");
            }).then(function(res) {
                logger.log("in handler chain");
            }).fail(function(err) {
                logger.log("in promise error handler -");
                logger.log(err);
            });
    });

    ////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////

    TestRunnerReady().then(function(logger) {
        logger.group("2. promise.fin, promise.done, unhandled exceptions");
    });

    TestRunnerReady("Test Case 2.1").then(function(logger) {
        logger.log("promise.fin (success scenario)", true);
        getResolvedPromise(logger, ["success"])
            .then(function(res) {
                logger.log("in promise success handler -");
                logger.log(res);
            }, function (err) {
                logger.log(err);
            }).fin(function() {
                logger.log("in finally");
            });
    });

    TestRunnerReady("Test Case 2.2").then(function(logger) {
       logger.log("promise.fin (failure scenario)", true);
        getRejectedPromise(logger)
            .then(function(res) {
                logger.log("in promise success handler -");
                logger.log(res);
            }, function (err) {
                logger.log("in promise error handler -");
                logger.log(err);
            }).fin(function() {
                logger.log("in finally");
            });
    });

    TestRunnerReady("Test Case 2.3").then(function(logger) {
        logger.log("promise.done ensures the unhandled exception is re-thrown (from rejected promise)", true);
        getRejectedPromise(logger)
            .then(function(res) {
                logger.log("in promise success handler -");
                logger.log(res);
            })
            .done(function() {
                // Q.js re-throws the unhandled exception when .done is called
                logger.log("in done (WONT REACH HERE)");
            })
            .fin(function() {
                logger.log("in finally (WONT REACH HERE)");
            });
    });

    TestRunnerReady("Test Case 2.4").then(function(logger) {
        logger.log("unhandled exception in promise stub (can't be trapped in .fail, .done).", true);
        getExceptionPromise(logger)
            .fail(function (err) {
                // won't execute this block
                logger.log("in fail error handler (won't hit)");
                logger.log(err);
            }).done(null, function(err) {
                // won't execute this block
                logger.log("in done error handler (won't hit");
                logger.log(err);
            });
    });

    TestRunnerReady("Test Case 2.5").then(function(logger) {
        logger.log("promise.done (catching unhandled exception with fail)", true);
        getRejectedPromise(logger)
            .then(function(res) {
                logger.log("in promise success handler -");
                logger.log(res);
            })
            .then(function(res) {
                throw new Error("throwing error in then handler");
            })
            .fail(function() {
                // catch the unhandled exception
                logger.log("catch the unhandled exception");
            })
            .fin(function() {
                logger.log("in finally (MUST be attached before done())");
            })
            .done(function() {
                // re-throws the unhandled exception (not catching with fail)
                logger.log("in done");
            });
    });

    ////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////


    // Chaining
    TestRunnerReady().then(function(logger) {
        logger.group("3. CHAINING: promise.then.then.then.fin, promise.then.then.fail.fin");
    });

    TestRunnerReady("Test Case 3.1").then(function(logger) {
        logger.log("Chaining (through outer handlers)", true);
        getResolvedPromise(logger, "Bob")
            .then(function(name) {
                logger.log("Name: " + name);
                return getResolvedPromise(logger, "30");
            }).then(function(age) {
                logger.log("Age: " + age);
                return getResolvedPromise(logger, "New York")
            }).then(function(city) {
                logger.log("City: " + city);
            }).fin(function() {
                logger.log("in finally");
            });
    });

    TestRunnerReady("Test Case 3.2", true).then(function(logger) {
        logger.log("Chaining (through inner handlers - to capture results from different handlers)", true);
        getResolvedPromise(logger, "Alice")
            .then(function(name) {
                logger.log("Name: " + name);
                return getResolvedPromise(logger, "40")
                         .then(function(age) {
                                  logger.log("Name: " + name + " Age: " + age);
                                  return getResolvedPromise(logger, "Salt Lake City")
                                         .then(function (city) {
                                            logger.log("Name: " + name + " Age: " + age + " City: " + city);
                                         })
                               });
            }).fin(function() {
                logger.log("in finally");
            });
    });


    TestRunnerReady("Test Case 3.3").then(function(logger) {
        logger.log("Chaining (outer handlers) with rejected promise", true);
        getResolvedPromise(logger, "Mastro")
            .then(function(name) {
                logger.log("Name: " + name);
                return getResolvedPromise(logger, "26");
            }).then(function(age) {
                logger.log("Age: " + age);
                return getRejectedPromise(logger);
            }).then(function(city) {
                logger.log("City: " + city);
            }).fail(function(err) {
                logger.log("in fail handler -");
                logger.log(err);
            }).fin(function() {
                logger.log("in finally");
            });
    });

    TestRunnerReady("Test Case 3.4", true).then(function(logger) {
        logger.log("Chaining (inner handlers - to capture results from different handlers) with rejected promise", true);
        getResolvedPromise(logger, "Alice")
            .then(function(name) {
                logger.log("Name: " + name);
                return getResolvedPromise(logger, "40")
                         .then(function(age) {
                                  logger.log("Name: " + name + " Age: " + age);
                                  return getRejectedPromise(logger)
                                         .then(function (city) {
                                            logger.log("Name: " + name + " Age: " + age + " City: " + city);
                                         })
                               });
            }).fail(function(err) {
                logger.log("in fail handler -");
                logger.log(err);
            }).fin(function() {
                logger.log("in finally");
            });
    });

    ////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////


     // Combination
     TestRunnerReady(null, true).then(function(logger) {
        logger.group("4. COMBINATIONS: Q.spread, Q.all, Q.allSettled");
     });

     TestRunnerReady("Test Case 4.1", true).then(function(logger) {
         logger.log("using Q.spread", true);
         Q.spread([10, 20, 30], function(a, b, c) {
            logger.log("Simple usage of spread");
            logger.log("values: " + [a,b,c].join(" "))
         });
     });

     TestRunnerReady("Test Case 4.2").then(function(logger) {
         logger.log("using Q.all", true);
         Q.all([
                 getResolvedPromise(logger, "param1"),
                 getResolvedPromise(logger, "param2"),
                 getResolvedPromise(logger, "param3"),
                ]).then(function(results) {
                  logger.log("in then handler");
                  logger.log("return values from promises are in array - ");
                  logger.log(results);
                });
     });

     TestRunnerReady("Test Case 4.3").then(function(logger) {
         logger.log("combination of promises with spread", true);
         Q.all([
                 getResolvedPromise(logger, "param1"),
                 getResolvedPromise(logger, "param2"),
                 getResolvedPromise(logger, "param3"),
                ]).spread(function(result1, result2, result3) {
                  logger.log("in spread handler");
                  logger.log("return values from promises are captured in params - ");
                  logger.log([result1, result2, result3].join(" "));
                });
     });

     TestRunnerReady("Test Case 4.4").then(function(logger) {
         logger.log("mixing array of promises and spread", true);
         Q.all([
                 getResolvedPromise(logger, "param1"),
                 getResolvedPromise(logger, "param2"),
                 getResolvedPromise(logger, "param3"),
                 Q.spread(["param4", "param5"], function(p, q) {
                    logger.log("in inner spread handler");
                    return [p, q];
                 })
                ]).then(function(results) {
                  logger.log("in then handler");
                  logger.log("return values from promises are in array - ");
                  logger.log(results);
                });
     });

     TestRunnerReady("Test Case 4.5").then(function(logger) {
         logger.log("combination of promises and spreads", true);
         Q.all([
                 getResolvedPromise(logger, "param1"),
                 getResolvedPromise(logger, "param2"),
                 getResolvedPromise(logger, "param3"),
                 Q.spread(["param4", "param5"], function(p, q) {
                    logger.log("in inner spread handler");
                    return [p, q];
                 }),
                 Q.spread(["param6", "param7"], function(p, q) {
                    logger.log("in inner spread handler");
                    return [p, q];
                 })
                ]).spread(function(result1, result2, result3, result4, result5, result6, result7) {
                  logger.log("in outer spread handler");
                  logger.log("return values from promises are captured in params - ");
                  logger.log("" + [result1, result2, result3, result4, result5, result6, result7].join(" "));
                });
      });

     TestRunnerReady("Test Case 4.6").then(function(logger) {
         logger.log("spread internally calls Q.all (calling it can be skipped in chains)", true);
         getResolvedPromise(logger, "param1")
             .then(function(result) {
                  logger.log("in then handler");
                  return [result, getResolvedPromise(logger, "param2")]
              })
             .spread(function(result1, result2) {
                  logger.log("in spread handler ");
                  logger.log("" + [result1, result2].join(" "));
              });
     });

     TestRunnerReady("Test Case 4.7").then(function(logger) {
         logger.log("combination of promises (including a rejected promise) with then handler", true);
         Q.all([
                 getResolvedPromise(logger, "param1"),
                 getRejectedPromise(logger, "param2"), /*rejected*/
                 getResolvedPromise(logger, "param3"),
                ]).then(function(results) {
                  // won't execute this block
                  logger.log("in then handler");
                  logger.log("return values from promises are in array - ");
                  logger.log(results);
                }).fail(function (err) {
                  logger.log("in fail handler");
                  logger.log("error - ");
                  logger.log(err);
                }).fin(function () {
                  logger.log("in fin handler");
                });
     });

     TestRunnerReady("Test Case 4.8").then(function(logger) {
         logger.log("combination of promises (including a rejected promise)  with spread handler", true);
         Q.all([
                 getResolvedPromise(logger, "param1"),
                 getRejectedPromise(logger, "param2"), /*rejected*/
                 getResolvedPromise(logger, "param3"),
                ]).spread(function(result1, result2, result3) {
                  // won't execute this block
                  logger.log("in spread handler");
                  logger.log("return values from promises are captured in params - ");
                  logger.log("" + [result1, result2, result3].join(" "));
                }).fail(function (err) {
                  logger.log("in fail handler");
                  logger.log("error - ");
                  logger.log(err);
                }).fin(function () {
                  logger.log("in fin handler");
                });
     });

     TestRunnerReady("Test Case 4.9").then(function(logger) {
         logger.log("combination of resolved and rejected promises", true);
         Q.allSettled([
                 getResolvedPromise(logger, "param1"),
                 getRejectedPromise(logger, "param2"), /*rejected*/
                 getResolvedPromise(logger, "param3"),
                ]).then(function(results) {
                   var output = [];
                   results.forEach(function(result) {
                      if (result.state === "fulfilled") {
                         output.push(result.value);
                      } else {
                         logger.log("Reject promise " + result.reason);
                      }
                   });
                   logger.log("Results - ");
                   logger.log(output);
                });
     });

    ////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////


    //Ending the Chains
    TestRunnerReady().then(function(logger) {
        logger.group("5. ENDING THE CHAINS");
    });

    TestRunnerReady("Test Case 5.1").then(function(logger) {
        logger.log("Exception goes uncaptured", true);
        getResolvedPromise(logger)
            .then(function(res) {
                logger.log("throwing error in then");
                throw new Error("error in then handler");
            }).then(function(res) {
                logger.log("in handler chain");
            });
    });

    TestRunnerReady("Test Case 5.2").then(function(logger) {
        logger.log("Properly hanlding the exceptions in the then handlers (promise.fail, promise.done)", true);
        getResolvedPromise(logger)
            .then(function(res) {
                logger.log("throwing error in then");
                throw new Error("error in then handler");
            }).then(function(res) {
                logger.log("in handler chain");
            }).fail(function(e) {
                logger.log("capture the error - ");
                logger.log(e);
            }).done();
    });

    ////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////


    // Beginning the promise chain (with custom methods as promises)
    TestRunnerReady().then(function(logger) {
        logger.group("6. BEGINNING THE CHAIN With custom methods as promises");
    });

    TestRunnerReady("Test Case 6.1").then(function(logger) {
        logger.log("Creating promises on the fly and chaining then with regular promises (Q.fcall, promise.done)", true);
        Q.fcall(function() {
           logger.log("creating a promise");
           return "param1";
        }).then(function(param) {
           logger.log(param);
           return getResolvedPromise(logger, "param2");
        }).then(function(param) {
           logger.log(param);
           return Q.fcall(function() {
               logger.log("creating a promise");
               return "param3";
            })
        }).done(function(param) {
           logger.log(param);
           logger.log("in done handler");
        });
    });

    TestRunnerReady("Test Case 6.2").then(function(logger) {
        logger.log("Handling unhandled exceptions from promised wrapped methods (Q.fcall, promise.done)", true);
        Q.fcall(function() {
           logger.log("creating a promise");
           logger.log("throwing an exception");
           throw new Error("Exception from Q.fcall handler");
           return "param1";
        }).then(function(param) {
           logger.log(param);
           return getResolvedPromise(logger, "param2");
        }).fail(function(err) {
           logger.log("in fail handler");
           logger.log(err);
        }).fin(function() {
          logger.log("in fin handler");
        }).done(function(param) {
           logger.log("in done handler");
        });
    });

    ////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////


    // Examples of Promise-for-objects, Promise-for-methods, Promise-for-arrays
    TestRunnerReady().then(function(logger) {
        logger.group("7. Promise-for-objects, Promise-for-methods, Promise-for-arrays");
    });

    TestRunnerReady("Test Case 7.1").then(function(logger) {
        logger.log("Retrieve properties of an object returned from a resolved promise (promise.get)", true);
        Q.fcall(function() {
           logger.log("Promise returns a custom object");
           return [{name: "Alice", age: 30}];
        })
        .get(0)
        .get("name")
        .then(function(name) {
           logger.log("(promise.get): Received the name property of the custom object");
           logger.log(name);
        });
    });

    TestRunnerReady("Test Case 7.2").then(function(logger) {
        logger.log("Tweak properties of an object returned from a resolved promise (promise.get, promise.set)", true);
        var customObj = [{name: "Alice", age: 30}];
        Q.fcall(function() {
           logger.log("Promise returns a custom object");
           logger.log(customObj[0]);
           return customObj;
        })
        .get(0)
        .set("name", "Bob")
        .then(function(obj) {
           logger.log("(promise.get and promise.set): Updated name from Alice to Bob");
           logger.log(customObj[0]);
        });
    });

    TestRunnerReady("Test Case 7.3").then(function(logger) {
        logger.log("Tweak properties of an object returned from a resolved promise (promise.get, promise.delete)", true);
        var customObj = [{name: "Micky", age: 30}];
        Q.fcall(function() {
           logger.log("Promise returns a custom object");
           logger.log(customObj[0]);
           return customObj;
        })
        .get(0)
        .delete("age")
        .then(function(obj) {
           logger.log("(promise.get and promise.delete): Made Micky forever younger (removed age)");
           logger.log(customObj[0]);
        });
    });

    TestRunnerReady("Test Case 7.4").then(function(logger) {
        logger.log("Call methods on a object returned from a resolved promise (promise.send, promise.invoke, promise.post)", true);
        var customObj = {
                           name: "Micky",
                           age: 30,
                           about: function()
                           {
                              logger.log(["(promise.send) ", "My name is ", this.name, ". I am ", this.age, " years old."].join(""));
                              return this;
                           },
                           getTraits: function (s1, s2, s3) {
                              logger.log(["(promise.invoke) ", "My traits are ", s1, " and ", s2].join(""));
                              return this;
                           },
                           getFriends: function (f1, f2) {
                              logger.log(["(promise.post) ", "My friends are ", f1, " and ", f2].join(""));
                              return this;
                           }
                        };
        Q.fcall(function() {
           logger.log("Promise returns a custom object");
           logger.log(customObj);
           return customObj;
        })
        .send("about")
        .invoke("getTraits", "funny", "mischievous")
        .post("getFriends", ["Donald", "Mini"])
        .done(function(obj) {
           logger.log("Done calling all the methods");
        });
    });


    TestRunnerReady("Test Case 7.5").then(function(logger) {
        logger.log("Execute a function returned by a resolved promise (promise.resolve(fn), promise.fcall, promise.fapply)", true);
        var showContainerDeferred = Q.defer();
        var hideContainerDeferred = Q.defer();

        //resolve a promise that returns a custom method
        showContainerDeferred.resolve(function (parentDivId, childDivId) {
            logger.log("showContainerDeferred:" + ["parentdivid: ", parentDivId, " childDivId: ", childDivId].join(""));
        });

        // Chain of promises that executes other promises
        Q.fcall(function() {
           logger.log("started a promise chain");
        }).then(function() {
           showContainerDeferred.promise.fcall("parent1", "child1");
           hideContainerDeferred.promise.fcall("parent1", "child1");
        }).then(function() {
           showContainerDeferred.promise.fapply(["parent2", "child2"]);
           hideContainerDeferred.promise.fcall("parent2", "child2");
        });

        //resolve a promise that returns a custom method
        hideContainerDeferred.resolve(function (parentDivId, childDivId) {
            logger.log("hideContainerDeferred:" + ["parentdivid: ", parentDivId, " childDivId: ", childDivId].join(""));
        });
    });

    TestRunnerReady("Test Case 7.6").then(function(logger) {
        logger.log("Execute a function returned by a resolved promise (promise.resolve(fn), promise.fcall, promise.fapply)", true);

        var showContainerPromise, hideContainerPromise;

        //resolve a promise that returns a custom method
        showContainerPromise = getResolvedPromise(logger, function (parentDivId, childDivId) {
            logger.log("showContainerPromise:" + ["parentdivid: ", parentDivId, " childDivId: ", childDivId].join(""));
        }, 100);

        //resolve a promise that returns a custom method
        hideContainerPromise = getResolvedPromise(logger, function (parentDivId, childDivId) {
            logger.log("hideContainerPromise:" + ["parentdivid: ", parentDivId, " childDivId: ", childDivId].join(""));
        }, 150);

        // Chain of promises that executes other promises
        Q.fcall(function() {
           logger.log("started a promise chain");
        }).then(function() {
           showContainerPromise.fcall("parent1", "child1");
           hideContainerPromise.fcall("parent1", "child1");
        }).then(function() {
           showContainerPromise.fapply(["parent2", "child2"]);
           hideContainerPromise.fcall("parent2", "child2");
        });
    });

    ////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////


    // Static methods
    TestRunnerReady().then(function(logger) {
        logger.group("8. Static methods - Q(value), Q.fcall, Q.fapply, Q.fbind, Q.delay, Q.resolve, Q.reject");
    });

    TestRunnerReady("Test Case 8.1").then(function(logger) {
        logger.log("Q(value) or Q(promise)", true);
        // composes a constant and a value from async op into Q chain
        Q.all([Q("hello"), Q(getResolvedPromise(logger, "world"))])
         .spread(function(s1, s2) {
            logger.log(s1 + " " + s2);
         })
         .fail(function(err) {
            logger.log(err);
         })
    });

    TestRunnerReady("Test Case 8.2").then(function(logger) {
        logger.log("Q.fcall - wraps a regular method and returns a promise", true);

        Q.fcall(function() {
            logger.log("regular function returns a promise");
            return getResolvedPromise(logger, function(a, b) { return a + b; });
          })
          .fcall(3, 5)
          .then(function(result) {
             logger.log("Result from an async op that return sum function: " + result);
          });

    });

    TestRunnerReady("Test Case 8.3").then(function(logger) {
        logger.log("Q.fapply - wraps a regular method and returns a promise", true);

        Q.fcall(function() {
            logger.log("regular function returns a promise");
            return getResolvedPromise(logger, function(a, b) { return a + b; });
          })
          .fapply([3, 5])
          .then(function(result) {
             logger.log("Result from an async op that return sum function: " + result);
          });

    });

    TestRunnerReady("Test Case 8.4").then(function(logger) {
        logger.log("Q.fcall - Executes an eventually returned function from promise", true);

        var asyncAddFn = getResolvedPromise(logger, function(a, b) { return a + b; });

        Q.fcall(asyncAddFn, 3, 5)
          .then(function(result) {
                logger.log("Result from an async op that return sum function: " + result);
          });
    });


    TestRunnerReady("Test Case 8.5").then(function(logger) {
        logger.log("Q.fapply - Executes an eventually returned function from promise", true);

        var asyncAddFn = getResolvedPromise(logger, function(a, b) { return a + b; });

        Q.fapply(asyncAddFn, [3, 5])
          .then(function(result) {
                logger.log("Result from an async op that return sum function: " + result);
          });
    });

    TestRunnerReady("Test Case 8.6").then(function(logger) {
        logger.log("Q.fbind - Returns promise by wrapping a method that may return data synchronously or asynchronously or throws an error", true);

        var getCompanyPromise = Q.fbind(function (id) {
                                    if (!id) {
                                       throw new Error("id cannot be null");
                                    }

                                    if (id === -1) {
                                       return "anonymous company";
                                    }

                                    return getResolvedPromise(logger, "Disney");
                                });

        Q.fcall(getCompanyPromise)
         .fail(function (error) {
              logger.log("in fail handler");
              logger.log(error);
          });

        Q.all([Q.fcall(getCompanyPromise, -1), Q.fcall(getCompanyPromise, 10)])
         .spread(function (company1, company2) {
              logger.log(company1);
              logger.log(company2);
          });
    });

} // end 'runQjsExamples'


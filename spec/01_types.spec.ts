describe('declaring variables', () => {
    describe('using let', () => {
        it('uninitizalized let', () => {
            let x;

            x = 12;
            expect(x).toBe(12);

            x = 'Pizza';
            expect(x).toBe('Pizza');
        });
        it('using an initialized let', () => {
            let x: number;

            x = 12;
            expect(x).toBe(12);

            // x = 'Pizza';
            // expect(x).toBe('Pizza');
        });
        it('using an initialized let', () => {
            let x = 12;

            expect(x).toBe(12);

            x = 42;

            const Pi = 3.14;
        });
    });
    describe('advanced types', () => {
        it('has union types', () => {
            let x: number | string;

            x = 12;

            x = 'Puppy';

            expect(x).toBe('Puppy');
        });
        it('type aliases', () => {
            type thingWithLettersAndStuff = string;

            let name: thingWithLettersAndStuff;

            name = 'Putintane';

            type NumberOrString = number | string;

            type CreditCardNumber = string;

            interface Person {
                name: string;
                age: number;
                cc: CreditCardNumber;
            }
        });
        describe('some of the built-in types', () => {
            it('has numbers', () => {
                const n1 = 3;
                const n2 = 3.14;
                const n3 = 0xFF; // hexadecimal
                const n4 = 0o22; // base 8
                const n5 = 0b1010; // base 2
                const myPay = 1_333_222;

                let x: number;
                x = n1;
                x = n2;
                x = n3;
            });
            it('has strings', () => {
                const s1 = 'This is a string';
                // tslint:disable-next-line: quotemark
                const s2 = "Double Quote";

                const s3 = 'She said "Ok"';
                // tslint:disable-next-line: quotemark
                const s4 = "The name is Flanner O'Connor";

                const s5 = 'It is Four O\'Clock';
            });
            it('template strings', () => {
                // these are back-tick delimited.
                const s1 = `Jeff`;
                const story = `Chapter 1.

                it was a dark and stormy night.

                the end.`;

                const age = 50;
                const s3 = 'the name is ' + s1 + ' and the age is ' + age + '.';
                const s4 = `the name is ${s1} and the age is ${age}.`;
                expect(s3).toEqual(s4);
            });

        });
        // it('what is so bad about the var keyword??', () => {
        //     const age = 27;

        //     if (age >= 18) {
        //         let message = 'Old Enough';
        //     }

        //     expect(message).toBe('Old Enough'); // message shouldnt be accessable outside of the if block.
    });

    describe('arrays', () => {
        it('has a literal syntax', () => {
            const friends = ['Amy', 'David', 'Jessika'];

            expect(friends[0]).toBe('Amy');

            friends[1] = 'Dave';
            expect(friends[1]).toBe('Dave');

            // friends[2] = 99; //No! this is an array of strings!

            const what = friends[999];
            expect(what).toBeUndefined();

            friends[999] = 'Gaia';

            expect(friends[999]).toBe('Gaia');
        });
    });

    describe('solving problems with tuples', () => {
        it('first the problem, without a tuple', () => {
            function formatName(first: string, last: string): { fullName: string, numberOfLetters: number } {
                const result = `${last}, ${first}`;
                return {
                    fullName: result,
                    numberOfLetters: result.length
                };
            }

            const formattingResponse = formatName('Han', 'Solo');

            expect(formattingResponse.fullName).toBe('Solo, Han');
            expect(formattingResponse.numberOfLetters).toBe(9);

            const { fullName: hisName } = formatName('Kylo', 'Ren'); // object destructuring
            expect(hisName).toBe('Ren, Kylo');

            const movie = {
                title: 'Jaws',
                director: 'Spielberg',
                yearReleased: 1977
            };

            const { title, director: by } = movie;
            expect(title).toBe('Jaws');
            expect(by).toBe('Spielberg');

        });
        it('doing it with a tuple', () => {
            function formatName(first: string, last: string): [string, number] {
                const result = `${last}, ${first}`;
                return [result, result.length];
            }

            const formattingResponse = formatName('Han', 'Solo');
            expect(formattingResponse[0]).toBe('Solo, Han');
            expect(formattingResponse[1]).toBe(9);

            const [name, letters] = formatName('Kylo', 'Ren');
            expect(name).toBe('Ren, Kylo');
            expect(letters).toBe(9);

        });
        it('array sestructuring', () => {
            const someNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

            const [first, second, , fourth] = someNumbers;

            expect(first).toBe(1);
            expect(second).toBe(2);
            expect(fourth).toBe(4);

            const [head, ...rest] = someNumbers;

            expect(first).toBe(1);
            expect(rest).toEqual([2, 3, 4, 5, 6, 7, 8, 9]);

        });
        it('object destructuring', () => {
            const person = {
                firstName: 'Ben',
                lastName: 'Solo',
                job: 'Jedi Trainee'
            };

            const { firstName, lastName: ln, ...rest } = person;
            expect(firstName).toBe('Ben');
            expect(ln).toBe('Solo');
            expect(rest).toEqual({ job: 'Jedi Trainee' });
        });
        it('array spread operator', () => {
            const numbers = [1, 2, 3];
            const newNumbers = [0, ...numbers, 4];
            expect(newNumbers).toEqual([0, 1, 2, 3, 4]);

        });

        it('object spread', () => {
            const movie = { title: 'Star Wars', director: 'Lucas', yearReleased: 1978 };
            const movie2 = { ...movie, yearReleased: 1977 };

            expect(movie2).toEqual({ title: 'Star Wars', director: 'Lucas', yearReleased: 1977 });

        });

    });
    describe('object literals', () => {
        it('has them', () => {
            interface Person {
                name: string;
                department: string;
                salary: number;
                manager?: string;
            }

            const bob: Person = {
                name: 'Bob Smith',
                department: 'QA',
                salary: 100_000,
                manager: 'Mary'
            };
            const mary: Person = {
                name: 'Mary Jones',
                department: 'CEO',
                salary: 80_000
            };

            function printEmployeeInfo(p: person) {
                let prelude = `Person ${p.name} workins in $p.department and makes $p.salary}`;
                if (p.manager) {
                    prelude += ` and they are managed by $p.manager`;
                } else {
                    prelude += ` and they have no manager`;
                }
                console.log(prelude);
            }
        };

    });
    it('has truthy and falsy values', () => {
        expect('tacos').toBeTruthy();
        expect('').toBeFalsy();
        expect(0).toBeFalsy();
        expect(-1).toBeTruthy();
        expect(undefined).toBeFalsy();
        expect(null).toBeFalsy();

    });
    it('has duck typing', () => {
        function logMessage(thingy: { message: string }) {
            console.log('Got: ' + thingy.message);
        }
        logMessage({ message: 'Call your mom' });

        const book = {
            title: 'Clean your garage',
            message: 'A clean garage is a sign of a healthy mind'
        };

        logMessage(book);

    });
    describe('extending interfaces', () => {
        it('example', () => {
            type MpaaRating = 'G' | 'PG' | 'PG13' | 'R' | 'NC-17';

            interface Movie {
                title: string;
                director: string;
                yearReleased: number;
                cast: { [key: string]: CastMember };
                mpaaRating: MpaaRating;
            }

            interface CastMember {
                role: string;
                actor: string;
            }
            const starWars: Movie = {
                title: 'Star Wars Iv: A New Hope',
                director: 'Lucas',
                yearReleased: 1977,
                cast: {
                    'Luke Skywalker': { role: 'Luke', actor: 'Mark Hamill' },
                    Han: { role: 'Han Solo', actor: 'Harrison Ford' }
                },
                mpaaRating: 'PG'
            };

            expect(starWars.cast['Luke Skywalker'].actor).toBe('Mark Hamill');
            expect(starWars.cast.Han.actor).toBe('Harrison Ford');
        });
        it('one more example', () => {
            const bob = {
                name: 'Bob smith',
                phone: '555-1212',
                department: 'DEV',
                salary: 850_000
            };

            const jenny: PhoneablePerson = {
                name: 'Jenny',
                phone: '867-5309',
                location: 'PA',
                email: 'jenny@tutone.net'
            };


            interface PhoneablePerson { name: string; phone: string;[key: string]: any; }
            function printPhoneList(person: PhoneablePerson) {
                console.log(`Call ${person.name} at ${person.phone}`);
            }

            printPhoneList(bob);
            printPhoneList(jenny);

            const bill: PhoneablePerson = {
                name: 'Bill Hulley',
                phone: '788-6675',
                location: 'WA',
                hairColor: 'GRAY'
            };
        });

    });
    describe('generics briefly', () => {
        it('creating a generic dictionary', () => {
            interface Dictionary<T> {
                [key: string]: T;
            }
            interface Vehicle {
                make: string;
                model: string;
            }
            const vehicles: Dictionary<Vehicle> = {
                738837: { make: 'Ford', model: 'Explorer' },
                348373: { make: 'Audi', model: 'TT' },
                38377388: { make: 'Chevy', model: 'Bolt' }
            };


            const friends: Dictionary<{ name: string }> = {
                bill: { name: 'Bill Hulley' }
            };

            expect(vehicles['738837'].make).toBe('Ford');

        });
    });
});

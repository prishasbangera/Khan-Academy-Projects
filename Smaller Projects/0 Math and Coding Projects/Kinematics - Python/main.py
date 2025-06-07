"""
Dropping my 10th grade coding assignment in here! (might have issues)
What an amazing day for the KACP :D
"""

import math

# custom_condition: OPTIONAL - returns True if input is in correct range/etc
def get_input(variable_name, units, custom_condition = lambda x : True):
    global num_variables
    while True:
        try:
            # get input and attempt to convert type
            ans = input("Enter " + variable_name.upper() + " in " + units + " (ENTER to skip): ")
            # if answer is not empty string, try to convert to float
            if ans:
                ans = float(ans)
                # raise exception if custom inequality is not True
                if not custom_condition(ans):
                    raise Exception
                num_variables += 1
            # break if successful
            break
        except:
            # error message
            print("Invalid input. Please try again.")
            print()
    print()
    return ans

while True:

    num_variables = 0
    
    # intro
    
    print("=" * 50)
    print()
    print("Welcome to The 1D Kinematics Solver.")
    print("This helps solve kinematics problems assuming constant nonzero acceleration.")
    print("If a variable is unknown, press ENTER to skip.")
    print()
    
    # ask for kinematics variables
    
    # acceleration
    a = get_input("acceleration", "m/s^2", lambda x : x != 0)
    # initial velocity
    v0 = get_input("initial velocity", "m/s")
    # final velocity
    v = get_input("final velocity", "m/s")
    # time interval
    t = get_input("time interval", "s", lambda x : x > 0)
    # displacement
    d = get_input("displacement", "m")
    
    # check that problem is solvable
    if num_variables < 3:
        print("Not enough information to solve the problem. ")
        print("You need at least 3 kinematics variables.")
    else:
        
        # check if user already has all the variables solved
        if a and v0 and v and t and d:
            print("Um, looks like there's nothing to solve.")
        else:
            
            # check if each variable is already present
            # 0 is falsy, so convert to string and basically check if string is empty
            has_a = bool(str(a))
            has_v0 = bool(str(v0))
            has_v = bool(str(v))
            has_t = bool(str(t))
            has_d = bool(str(d))
            
            # find acceleration
            if not has_a:
                if not has_d:
                    # if we don't have displacement
                    a = (v - v0) / t
                elif not has_v:
                    # if we don't have final velocity
                    a = (d - v0*t) * 2 / (t*t)
                elif not has_t:
                    # if we don't have time
                    a = (v*v - v0*v0) / (2*d)
                else:
                    # if we don't have initial velocity
                    a = 2 * (v*t - d) / (t*t)
                print("The acceleration is", a, "m/s^2.")
                    
            # find v0
            if not has_v0:
                # we should have a
                # but if we have v, v0, and t, we can avoid sqrt
                if not has_a:
                    # if we didn't have a at first
                    v0 = 2*d/t - v
                elif not has_d:
                    # if we don't have displacement
                    v0 = v - a * t
                elif not has_t:
                    # if we don't have time
                    v0 = math.sqrt(v*v - 2*a*d)
                else:
                    # if we don't have final velocity / we had 4 vars at first
                    v0 = (d - 0.5*a*t*t) / t
                    
                print("The initial velocity is", v0, "m/s.")
                
            # find v
            if not has_v:
                # we should have v0 and a
                if not has_t:
                    # if we don't have time
                    v = math.sqrt(v0 * v0 + 2 * a * d)
                else:
                    # if we don't have displacement / we had 4 vars at first
                    v = v0 + a*t
                print("The final velocity is", v, "m/s.")
                
            # find d
            if not has_d:
                # we should have v, v0 and a by now
                d = (v*v - v0*v0) / (2*a)
                print("The displacement is", d, "meters.")
                
            # find t
            if not has_t:
                # at this point, we should have all other variables
                t = (v - v0) / a 
                print("The time interval is", t, "seconds.") 
      
    # break if person doesn't want to do it again
    print()
    answer = input("Would you like to do another problem (y/n): ").lower()
    if not(answer == "y" or answer == "yes"):
        break
        
    print()

# exit message            
print()
print("Thank you for using The 1D Kinematics Solver. Have a good day.")
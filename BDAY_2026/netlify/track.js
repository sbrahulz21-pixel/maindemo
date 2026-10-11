//...............................................
// SUPABASE TRACKING FUNCTION
//...............................................

const {
    createClient
} = require("@supabase/supabase-js");


//...............................................
// SUPABASE CONNECTION
//...............................................

const supabase = createClient(

    process.env.SUPABASE_URL,

    process.env.SUPABASE_SERVICE_ROLE_KEY

);


//...............................................
// MAIN FUNCTION
//...............................................

exports.handler = async function (event) {

    if (event.httpMethod !== "POST") {

        return {
            statusCode: 405,

            body: JSON.stringify({
                error: "Method not allowed"
            })
        };

    }


    try {

        const data =
            JSON.parse(event.body);


        const { error } =
            await supabase
                .from("visitors")
                .insert({

                    visitor_id:
                        data.visitor_id,

                    event_type:
                        data.event_type,

                    page:
                        data.page || null,

                    section:
                        data.section || null,

                    device:
                        data.device || null,

                    model:
                        data.model || null,

                    browser:
                        data.browser || null,

                    platform:
                        data.platform || null,

                    platform_version:
                        data.platform_version || null,

                    screen_width:
                        data.screen_width || null,

                    screen_height:
                        data.screen_height || null,

                    time_spent_seconds:
                        data.time_spent_seconds || null

                });


        if (error) {

            console.error(error);

            return {

                statusCode: 500,

                body: JSON.stringify({
                    error: "Database error"
                })

            };

        }


        return {

            statusCode: 200,

            body: JSON.stringify({
                success: true
            })

        };


    } catch (error) {

        console.error(error);

        return {

            statusCode: 400,

            body: JSON.stringify({
                error: "Invalid request"
            })

        };

    }

};
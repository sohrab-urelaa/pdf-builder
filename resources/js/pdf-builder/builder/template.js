const image = `data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJQApQMBIgACEQEDEQH/xAAbAAACAwEBAQAAAAAAAAAAAAAEBQADBgIHAf/EADkQAAIBAwQABAMGBgEDBQAAAAECAwAEEQUSITETQVFhBiJxFDJCgZGhFSOxweHwUmJy0QdDU2Px/8QAGQEAAgMBAAAAAAAAAAAAAAAAAgMAAQQF/8QAJxEAAgIBBAICAgIDAAAAAAAAAAECEQMEEiExE0EiYTKhUYEFFEL/2gAMAwEAAhEDEQA/AMrADR0UwTGaqjMYHlQtzKATspTpoNSY8juFI+WqnlO6ldrK/rxRYkDMF8zWfxtSGphsF14Uik+tbDSdVhMI5HQrCzQTCPeBkDvFURXUsX3MimxTQanR6U+qosnBGKWazqytFtU4NZBL+U/eNcTXLycZqOTfAx5F6HVndhnwTTYJG6+RrJWZcHJ6p7bT/KOawZm4fiLsMFmmeeqPSwi8PPnS7x8iiEuSF+8aDDqtr+ZTv0NbLRo5iC1Mv4NFCMjFLdO1YQAbjVt3rjSDEa104Z8LXDES3ssntlAIFUwMICQRx60K95O3JHFUyXhCnIrQqEts51u7EiYQfnWcKySsfSmF3dbicjjNDfaY1FKnG2HFr2LbvMdAvOR50XdyiV66/hZki3D9qBY2ySa9C0zt61K+y2xjcqR1UqqF2JkllxwTViF3IBru2AdgPWtPaaBBexKbSfE47RujTdqQ7Gpzi2l0K7WAbdxr6CI5lJ6Brq6huLSRoJ0aORewaBYtuySapQd2wFkfs0iXFv4Ry+SRwMUGUhY8YpSHk6BNXwFhzmjb+gnNBs1vtXKiurWzeRs44FUy3RCgdmj9P1GPaEPdJcW02V5Cy6jWG3AC8+dCWlyecmjL6QPCcUhR9jsM1zcUXKLsduNAtx71atz70iWf3o7TCtzf28LsoV3AJbrFL8Fui4yt0Nkn96vWYqeex5VtxoemMluxt03r0V6P19at1TQbTULZMqsciEYdR5Z5FaH/AI6StqQ1pJGUtbxHULIMZ4zRLaS9zG8kOCo/etaNJsxbiHwE2BQMY7odLdNOg8IKZELkjJ5FdHDGcVUnYnxRnLgwNzpdyQcR9UBd6Ffx2r3LoFiXrnuvSbGD+ZO8iDbvITPmPWlvxnNHBpUmcBeAB70yTqLZI4or8jy9YJN/XVNoLwxQeHgUtnvkTNUi8RzkUiGopXJGVxvo5vnJnJFSjEltmUFyM1KapY3yByLotP8ADgacNhgM1VYao8EmQxVgcgj1riC6kdWjY4BFASQ/zMu21fakWzq4M+OMLSo1uq3qanbRXJAMi/K2POlawGRgFUlicAAVrlsLFPgq3WSBZJ3jHgsOCrdk5H9K+fCuixx3cd405cxLuWFl53eufP8A3unxbumDn0c8kt8OhFf6Bc6ciPOoKtwdv4W/4/WhPCwOq9GltlvbS8tiFzKC6f8Af2D/AL61gthZWZRwvZ9D/uak5xguTPqdM8eTbHoEW1eRgAuaNTSJo08VsACq47vwpBjvOOKe3dtrU+mkw6fKyMudyEE/p3Q48sZ8Iz+KbVoR3EoEG0HND2Ok6jqMck1naSzIn4kHf09a70XTptQ1W309tyNJJtfI5Udtx5cZr2O0a3sIUtbaGOK3jXC49fpUjijC/sdgxyyHjlho2o3rN4FuxKHDb/l59OaI0udLbWoLW9t/DxJscuMEE17LFbq6iSVo2kPbquAw/Wvg0iwe8W/ltIXukXYspUEgf750XjiOcVDa12ga12wwJgr4ajgg5GK6N0l5C620xXDYyAQQfzoiS2WPciDg8gY6oAxLbO+4BQec0w2R2y59hKNcbFBdvlGNwPdDJGYGcszPu5O49mqD8Q6faSiC6uMFvu/ISP1xVVzqlrMCYJg/0qILZNPo6Rn/AIrbO0jcEqFB45HpWW/9SLuW8v7TSLFS8hbe6oMn2FMhqaxXHjsGfwwWVF5LN5KPcmj/AIf0wWpm1G9xJqV0d0jf/GPJV9hUfPBl1LbdGHHwLqDWwku544mxnZ94isrqlrJpl0YfE3n2r2L4gv4rO1LO2ZGBCrnkmvLb+zmnle4mUjec8jiqcV/RmyrFDHSXyM8007H5c1KZqqIMACpWCWognSRmplGkC3a/jW8QtC52thtuPQ5rT6x8FXAt/tGkSm5QDJgYfzPqP+X04NY1uDycV6T8Da+moQCxuJAt3GPlz+Metb9qG4HCcHCXYLa3ni6DpyHcDHGVYEYIIJBGPyo7S7rw5F2njPHrXfxZbNDGtysW3LfzCOiT5/tWatr7a/DVOjv4HuxpG+hnVZ1b6Ef3rP6hZJa6d4BXYzlnfnkEjr8h/Si9EuVurxfmGIo95+ucCgteaXU5pLSzZPEI7ZsADNLyJSJkit3VtJmIS4EV8rMSRFKD9cH/ABXtsYkVFW1lKCVV2MPLOeR74ry5PgHWfG8VhE8R5Jifcf04r0n4fAt9OtLZ52kkt12/OpVseQIPoOPypkYqKo5ekWSFprgZ3thZR3Ed54C/a1Up4wHJB7z6/wCaDJyxoq/W4udohfYFbvbnIruG3WN97gEY/T3pWVSq0bMTjjj9gSSSFcbnwOvamumzYjfxWxg+dURXUDOIVnbfn7oQ8EVTdJdSXCESYiUfcIHfrnusunyzy24roqVZPi1QyknHiKeDzWa127mSaR3YGHcBEoHPnk0deNMkEn2eXaxB2uRnBpUbOfUkijuJiVRsyyE8nj0FbYbq+QWOKx/MTT3S3AZvCLAdvjgULdX0FuoMkyRR8AuT1Tv4ngU6ctlaARRL0B549axsNsLy38KZfHi3HlvxCi64NWbM/Bv/AEa6y1z4ctbYeBqMEshGZDkEk/2oe/8Aje1hQpZJ4reTHhRWSn+DdNnUvZzS2k3lzuXP0rKatDqGjzGG6bOfuuOmFLyLJXxODPJLujUya7dvf/bZpBK+chW6Htih9X1q61Db4pREH4YxxWIa/uD1Ian8QuPNsisrw5arcZm23bNIW3HK8CpWfGpzYxUpX+tIqxkxUncB17060+x06edJrTVvsrjG2OdxHIh/7jgH8v8AFIiNhIJODVTDk5rp0Djmou2rPU5dav4NOe11BbW6t3XaZJsDI9cj+1eeXdz4KtJBIGO4hRyR/n0paEQfdVR9BXbrvAQHGfShcXRtxa3a66Rr9C1u2khCuJLeVgBJ4b8N+uTVPw/qX2PXQ1zKWSRtjyN9eCfb/wA1lbVXVnCuVMZGcDyrdfDkcKIssQjYtzuIyaGHdHQi3naljlVfs9Pt9whVo2yMfpS6zk1BZ3S7ljmKMcMVwSPLqhbDV5bZ9rqZIz36imklxa3SeJbzJHIPwu2M+1OZIz8cna7Dre8QcSgqT+YpgCrKCpBHeQaycmoKvD4Ujvn+9c2+qx+L4Rk76XNS0A8W98Grjjj8VpMZfGM0Jfy7DtU4UD5jmkV+X2boJ3ikHTI2MVl2n1WeTbql80yKeF2qgPucDmhSUeKNOPTKXzcjYXl6gj2qck8ALV9vi3tgZDzjLVltNukMm5Y9zA4XPQ96Ysk85BkkyO8CopWLyJR4GE8FveoyzksjDG1WxkfUc0p1Ozs7WzK2sawhRhdg5H0om7u7PR7XxtQuo4E8t7cn2A8zXm/xL8WTatKIrEPBaqeM/fkI8z6D2o+BL1MMXMufo0uZI4EE/MoXk+9Zb4ob7bbGNx8y8qfQ1Xa6hquweLcExgcBlBNU6ncXcse3xIoy3/SCcUE5JLkTj1GB3uXZjGOGweCO6maOvNOlLGZZFkLdgDH7UuyQ2D2KCMlJcGCUafHRYKlcFsV9q6Ao0joQAsnHpVDA8hh1TN7ZsY7Hp3QVxC6jkHinJCbBwcV2nAOBlj+1DKWMmMU1tLGRhude6lBALDwp43JOyQbXx6/7/SnenXFzYOHhdUTzQjIP1qq705p7SREwZAMqO+RXNhe2y6as8m1pR8uzHJI8/YUuqkNjOSScXyja2PxNpzmKC7V4pnB6GV46596cmWz4KXURx5MRmvGpL52vDcP9/ORjyFONK1OdrpYg+VIyVbnAxS3kkpVXBqhqJyVPs9A1HU7WFPmmBPoozWfuhJdFSAY17Dfi/bqhJfnO49muBLKi7EdgPLnqrlCzdjyOLqQ7i1S/ijCSlZQBwSMGqriaW5UiQgIeCE86z2o381pD4szvKeljJCj9hQkXxJNa3SNOFkQ8GJeBjvI96FOuGzTk1GOKpO2aOCS5tji3mZFHS9gfqKYQ6jqMqlHvJYx/yiVQf6UPY3FlqKhrSUEkcqeCPypgtoAOGB+lNjH+DOrl2ZL4i0W+2SXazfbY8ZLOT4qD+4+n6UP9qtrO3ja1gUyFRukfk59q19wVt42zIgHuaxF7HBJO5hwVJyCOhV0Z9Zp2oLIDiaWWZn8Rzk5PNcySpBk7A5PkarlV4T54PRFUPmTvuhcU+zmN0W7Dcw5VSpzjIPApLdQSW900cg57+tabRQMyRN5jI+oo270GHVESRZGSWMc8dirUFFcFrJb5MPJnd1UrRt8OruIbxMj3FSpRe+JqVbccBQPbFEW9vbMzfaCVUKSAFzuPkP8ANDJcWkQjEKuflIkYsMlvb26rn7agQKu7xCTyevpTBVMM+yWoG8RJj3FV3Uhscb4AFYZU+1VxXJchJFKkjgjuqXX8MpL44BaqsujmfXl5KRRg+gU4rKTEfapQMBZWLgDoHzpxeWqclePak93A3Y7XrFC1wFF0ViLf93qmWmoLSbfLlXI4z5ilUdy0eJF8+x6VLrUTKrB2Jc4IOej5ULlXobhltnuZtEk31Vd3kFqv8wguRkIOzWQXXbxRj5MeYAxQsl2zeJLjDP75qO64N+XU4/8AhBNzfy3t4zStgMMADoDPVCzO5Y59a+2aqDuYE+QOeqv8PceRUUeTBKb7K4ZpcbOgfP0+lNIdV1GIBUv5yvu5P9aFSLHQFExxr+I4Pl9aOqBlll2Ex3k07AzXEjn3Jo6KFJY3bxERlGQD+L6UsNrMsQnCkRsSobyJHdWxTTQMu7PX4h5VYqUnLthckWR4co4PVAS2zQyDj5T0aeQzrFbxz3MSSwyhgEV+QR5kZyK6NumWj3wS4wCFkBHPofOoC2KLYGCZZF/OnlvN4cu4fdf9qpSzwWUsEUDpxz9BXaphdjAMvkR2KgLYfJtdskCpQSyBRhm66PrUq6KsUeJt+62fpVnjJ4Tb2fcVBQL/AH9u/ehoU8WTw4z8/wDxB5piNMKkyxruUH5Y2xliMHkA8A+tUmn0OsXtdlXQxPMWVQGLtnnJ69sYppaXazxhXOWoC/gZndzGsBY5CIMBfYUra4kgbIbBFUQ0N1EUIwQ+RnjPHtS6dDjJXFCSfE9xDCYxHHISR98HGKW3evXlxwvhRD/61/8AOagSi2S7Xwbggfdfr60uPJOa++K7sWkcs3uaj4GD61QaVHyuwMxYB5JqvPNdISEz554qML0M9+IFQIqqD5UWseTkce1U3ElvNbRyW/ZOGUnkGrTqMUd3tIDQA4ODz9aG0mLabL0hz5Zq9ImH/t/tRPjxKRtwQej7VdHcqWAJVMjknyo07BljkuGUJby8ERMM+ZGM0wtrS8kjkKKSigGQscgAdVUl2F+6qY6BIxV0dy781LB2sLtrcxMH/lMcEDdHnujYkbwI4f5fhoxZcwA9+pxzQcmo6heLGkj7/BQKu1Qp2geeBz1VCzXMg2BjtznluB+VQpoYmJEGW+XPP3CB+1Tw4pfu7m9u/wD8qmCFAwMhaRvJRnmrjdqMoowPpUsqj4bAtyOPrUrqBkk3NKZAv4dhH5919owTyR7qVn372Bzn5Tjmn2n/ABfeRRiG+jS7iH4m4f8AXz/Os1X0Gl0kbaRtH1zTLleJCnB+R/k5xxzgjv8AWkV9dwZOyQOf+nqlOa+ZqwNis6dixzXyvndQVAz7XY5Q58hxXFfc1CMsUxqpypZvKr7ydpFiR7dYii9gY3e9Vi3dJEDYDMAyjsGrblWaNXdQsmcYB4I/tV1wUVQELExywOexVIGKIhjeWIJGuXZsAVQylWKsPmBwaBEG2k3wCLbS9jiNyeh6U8iRmK/JnA7zyfyrGGi4NQ1CJCkVzNsPGM7sfTPVWSVyqzWGW5dv5Vuykfh2E08s5L4JF/EHjkhj6tFtogMe74z+5rBQ3mq6dEnjGfwJj8gkJOT6imE2tXOnOVnV2uMD5W6A9T60O1p2yObqkjVXKNLM0ka+AG/Ajcftih3fwl548u6U6H8WvLMYNQijKsPldeCPYjzrQ+JaXeCpAyPMZFGhMlQFHdXOMQsYvmDLKoIkUj0YcirAPDXdv3NndmQ5yff1o63itEcBoJZio5XftU/kBn96JZT47CO0trPYgY7p/mP0wQxPPWasqrKLi7vtTZZb6RMqMIAOl+ualWkbjkgEnk85/qalQqzxypUqVRpPtQ1KlQh8qCpUqEOh3XcpbaMsTUqVaIF3OIgrRqoHHyY46oa4fdIcKqDyVRgCpUqyF9jy8eRkBjx+VcsuIH+Y8N1UqUKIfLKJJp1WQZBNejaBpFnZWkk0SFnIzl+alSn4ErFy6Efx5MX/AIWdqgcnCjA7FZvWp2uNRlkcAHOMDqvtSgzfkEukBRsY5VdewRXpmm2sRghkwcsoJ54qVKUVkQReztbHbEqjjsjJpBqWrXUEAeNlB3Y6r7UqmJXZ3pWvXM9vukit8jzCH/zUqVKtBuKP/9k=`;

const emptyData = {
    acceptFileTypes:
        "image/*, application/pdf, .docx, .doc, .xlsx, .xls, .odt, .rtf",
    currencies: "",
    withLogo: true,
    withConditions: false,
    withFormula: false,
    withPayment: true,
    isPaymentConnected: false,
    withPhone: false,
    template: {
        id: 186250,
        name: "Empty Doc",
        schema: [],
        fields: [],
        submitters: [
            {
                name: "First Party",
                uuid: "2c3038bd-82be-4024-beed-f55d246f4c69",
            },
        ],
        created_at: "2024-08-02T13:30:22.594Z",
        updated_at: "2024-08-02T13:30:22.594Z",
        preferences: {},
        documents: [],
    },
};

const dataSet = {
    acceptFileTypes:
        "image/*, application/pdf, .docx, .doc, .xlsx, .xls, .odt, .rtf",
    currencies: "",
    withLogo: "true",
    withConditions: "false",
    withFormula: "false",
    withPayment: "true",
    isPaymentConnected: "false",
    withPhone: "false",
    template: {
        id: 134354,
        slug: "UuWbTvCwu7R5Rc",
        name: "Hello",
        schema: [
            {
                attachment_uuid: "04c24365-6846-4135-bead-0a16867c77bd",
                name: "sohrab.dev",
            },
        ],
        fields: [
            {
                uuid: "2e2de455-4c16-421a-b45f-ac773e39ede2",
                submitter_uuid: "02167f20-c5a6-40d9-a224-9f84ea6a3852",
                name: "",
                type: "date",
                required: true,
                preferences: { format: "MM/DD/YYYY" },
                areas: [
                    {
                        x: 0.06923076923076923,
                        y: 0.02492301934298498,
                        w: 0.2,
                        h: 0.02857142857142857,
                        attachment_uuid: "03bb98c1-377e-4103-bed5-ab91ad94c390",
                        page: 2,
                    },
                ],
            },
            {
                uuid: "b43ffdb2-11a2-4b45-b32b-314436988b40",
                submitter_uuid: "02167f20-c5a6-40d9-a224-9f84ea6a3852",
                name: "",
                type: "text",
                required: true,
                preferences: {},
                areas: [
                    {
                        x: 0.5461538461538461,
                        y: 0.04889511360099595,
                        w: 0.2,
                        h: 0.02857142857142857,
                        attachment_uuid: "03bb98c1-377e-4103-bed5-ab91ad94c390",
                        page: 0,
                    },
                ],
            },
            {
                uuid: "b7139a63-3185-4f0c-805c-4c5f338ec1c7",
                submitter_uuid: "02167f20-c5a6-40d9-a224-9f84ea6a3852",
                name: "",
                type: "signature",
                required: true,
                preferences: {},
                areas: [
                    {
                        x: 0.7553605769230769,
                        y: 0.3730286997499192,
                        w: 0.2,
                        h: 0.07080610021786492,
                        attachment_uuid: "03bb98c1-377e-4103-bed5-ab91ad94c390",
                        page: 0,
                    },
                ],
            },
            {
                uuid: "9973f580-a97d-4943-a39f-7b00b69c750e",
                submitter_uuid: "02167f20-c5a6-40d9-a224-9f84ea6a3852",
                name: "",
                type: "initials",
                required: true,
                preferences: {},
                areas: [
                    {
                        x: 0.5184615384615384,
                        y: 0.4987861811391223,
                        w: 0.1,
                        h: 0.02857142857142857,
                        attachment_uuid: "03bb98c1-377e-4103-bed5-ab91ad94c390",
                        page: 0,
                    },
                ],
            },
            {
                uuid: "5c444c31-f2d8-48b4-9deb-9d2747c7082c",
                submitter_uuid: "02167f20-c5a6-40d9-a224-9f84ea6a3852",
                name: "",
                type: "date",
                required: true,
                preferences: { format: "MM/DD/YYYY" },
                areas: [
                    {
                        x: 0.7846153846153846,
                        y: 0.6153439153439154,
                        w: 0.2,
                        h: 0.02857142857142857,
                        attachment_uuid: "03bb98c1-377e-4103-bed5-ab91ad94c390",
                        page: 0,
                    },
                ],
            },
            {
                uuid: "98257c21-70ff-432a-8e2b-7760334260a9",
                submitter_uuid: "02167f20-c5a6-40d9-a224-9f84ea6a3852",
                name: "",
                type: "number",
                required: true,
                preferences: {},
                areas: [
                    {
                        x: 0.5661538461538461,
                        y: 0.6523809523809524,
                        w: 0.2,
                        h: 0.02857142857142857,
                        attachment_uuid: "03bb98c1-377e-4103-bed5-ab91ad94c390",
                        page: 0,
                    },
                ],
            },
            {
                uuid: "d85229d3-4344-45fb-963a-2ada3f397c53",
                submitter_uuid: "02167f20-c5a6-40d9-a224-9f84ea6a3852",
                name: "",
                type: "image",
                required: true,
                preferences: {},
                areas: [
                    {
                        x: 0.3784615384615385,
                        y: 0.3540305010893246,
                        w: 0.2,
                        h: 0.1416122004357298,
                        attachment_uuid: "03bb98c1-377e-4103-bed5-ab91ad94c390",
                        page: 0,
                    },
                ],
            },
            {
                uuid: "e9b339a0-284d-4610-8bd4-5918db73ffcf",
                submitter_uuid: "02167f20-c5a6-40d9-a224-9f84ea6a3852",
                name: "",
                type: "checkbox",
                required: false,
                preferences: {},
                areas: [
                    {
                        x: 0.2723076923076923,
                        y: 0.6352578068264343,
                        w: 0.03333333333333333,
                        h: 0.02360203340595497,
                        attachment_uuid: "03bb98c1-377e-4103-bed5-ab91ad94c390",
                        page: 0,
                    },
                ],
            },
            {
                uuid: "7e14f177-33ea-4a7c-b811-9c0835da54ad",
                submitter_uuid: "02167f20-c5a6-40d9-a224-9f84ea6a3852",
                name: "",
                type: "multiple",
                required: true,
                preferences: {},
                options: [
                    {
                        value: "Hello",
                        uuid: "b11cc295-2576-4274-abb0-262066a581cd",
                    },
                    {
                        value: "Ami",
                        uuid: "5aa71046-299b-4d31-a2c8-d6fa4cdd9034",
                    },
                ],
                areas: [
                    {
                        x: 0.4846153846153846,
                        y: 0.7722066604419546,
                        w: 0.2,
                        h: 0.02857142857142857,
                        attachment_uuid: "03bb98c1-377e-4103-bed5-ab91ad94c390",
                        page: 0,
                    },
                ],
            },
            {
                uuid: "85b7f0bc-33b7-470c-ba01-c6a881093e97",
                submitter_uuid: "02167f20-c5a6-40d9-a224-9f84ea6a3852",
                name: "",
                type: "file",
                required: true,
                preferences: {},
                areas: [
                    {
                        x: 0.7507692307692307,
                        y: 0.8844070961718021,
                        w: 0.2,
                        h: 0.02857142857142857,
                        attachment_uuid: "03bb98c1-377e-4103-bed5-ab91ad94c390",
                        page: 0,
                    },
                ],
            },
            {
                uuid: "200f05d2-a6b1-4acb-a112-7a303419dfc8",
                submitter_uuid: "02167f20-c5a6-40d9-a224-9f84ea6a3852",
                name: "",
                type: "radio",
                required: true,
                preferences: {},
                options: [
                    {
                        value: "Helloo",
                        uuid: "87f8b0c6-d9b3-466e-a1b5-afbf1602f454",
                    },
                    {
                        value: "ami",
                        uuid: "8a8b1cfa-f4de-49e0-b963-1c5ef64bb25b",
                    },
                ],
                areas: [
                    {
                        x: 0.18,
                        y: 0.7319016495487084,
                        w: 0.2,
                        h: 0.02857142857142857,
                        attachment_uuid: "03bb98c1-377e-4103-bed5-ab91ad94c390",
                        page: 0,
                    },
                ],
            },
            {
                uuid: "f033c9a4-ba95-4df8-b8da-400b80775901",
                submitter_uuid: "02167f20-c5a6-40d9-a224-9f84ea6a3852",
                name: "",
                type: "select",
                required: true,
                preferences: {},
                options: [
                    {
                        value: "hello",
                        uuid: "87277109-fc0e-4faa-a098-7e595d3dc16b",
                    },
                ],
                areas: [
                    {
                        x: 0.4015384615384615,
                        y: 0.8756924992219111,
                        w: 0.2,
                        h: 0.02857142857142857,
                        attachment_uuid: "03bb98c1-377e-4103-bed5-ab91ad94c390",
                        page: 0,
                    },
                ],
            },
            {
                uuid: "438c4e2c-d96d-46db-b31f-ece61011714d",
                submitter_uuid: "02167f20-c5a6-40d9-a224-9f84ea6a3852",
                name: "",
                type: "cells",
                required: true,
                preferences: {},
                areas: [
                    {
                        x: 0.4046153846153846,
                        y: 0.591378773731715,
                        w: 0.2,
                        h: 0.02857142857142857,
                        cell_w: 0.04,
                        attachment_uuid: "03bb98c1-377e-4103-bed5-ab91ad94c390",
                        page: 0,
                    },
                ],
            },
            {
                uuid: "2b9456cf-cc35-45dd-8ad4-a1f30dac5304",
                submitter_uuid: "02167f20-c5a6-40d9-a224-9f84ea6a3852",
                name: "",
                type: "stamp",
                required: true,
                readonly: true,
                preferences: {},
                areas: [
                    {
                        x: 0.24,
                        y: 0.8393246187363835,
                        w: 0.2,
                        h: 0.07080610021786492,
                        attachment_uuid: "03bb98c1-377e-4103-bed5-ab91ad94c390",
                        page: 0,
                    },
                ],
            },
        ],
        submitters: [
            {
                name: "First Party",
                uuid: "02167f20-c5a6-40d9-a224-9f84ea6a3852",
            },
            {
                name: "Second Party",
                uuid: "569b4589-267c-4df4-919b-83929e1a6a02",
            },
        ],
        author_id: 20605,
        account_id: 18801,
        archived_at: null,
        created_at: "2024-06-22T08:55:52.385Z",
        updated_at: "2024-06-25T09:28:58.569Z",
        source: "native",
        folder_id: 21026,
        external_id: null,
        preferences: {},
        documents: [
            {
                id: 1482688,
                name: "documents",
                uuid: "04c24365-6846-4135-bead-0a16867c77bd",
                record_type: "Template",
                record_id: 134354,
                blob_id: 1217250,
                created_at: "2024-06-22T12:11:26.600Z",
                metadata: {
                    identified: true,
                    analyzed: true,
                    pdf: {
                        annotations: [
                            {
                                type: "external_link",
                                value: "https://github.com/sohel902833",
                                x: 0.1718332328090197,
                                y: 0.1822100355405915,
                                w: 0.3238077022787275,
                                h: 0.0166292555181444,
                                page: 0,
                            },
                            {
                                type: "external_link",
                                value: "https://sohel-902833.netlify.app/",
                                x: 0.1848517927717728,
                                y: 0.1655807800224471,
                                w: 0.3210360088673026,
                                h: 0.0166292555181444,
                                page: 0,
                            },
                            {
                                type: "external_link",
                                value: "https://github.com/sohel902833/react_redux_fullChat",
                                x: 0.179224415239486,
                                y: 0.9118780115974562,
                                w: 0.02076922262961024,
                                h: 0.01662925551814439,
                                page: 1,
                            },
                            {
                                type: "external_link",
                                value: "https://github.com/sohel902833/node_t_chatApp",
                                x: 0.179224415239486,
                                y: 0.6947474466891135,
                                w: 0.4925450375378951,
                                h: 0.01662925551814436,
                                page: 1,
                            },
                            {
                                type: "external_link",
                                value: "https://github.com/sohel902833/react_redux_fullChat",
                                x: 0.179224415239486,
                                y: 0.6781181911709691,
                                w: 0.5383199741811237,
                                h: 0.0166292555181444,
                                page: 1,
                            },
                            {
                                type: "external_link",
                                value: "https://learnwithsumit.com/certificates/verify/LWSCTXN-EMEQWTW4",
                                x: 0.1254703611997312,
                                y: 0.5614164515525629,
                                w: 0.1330648011470354,
                                h: 0.0124719416386083,
                                page: 2,
                            },
                            {
                                type: "external_link",
                                value: "https://learnwithsumit.com/certificates/verify/LWSCTXN-EMEQWTW4",
                                x: 0.361988198974652,
                                y: 0.5475785353535356,
                                w: 0.5428554724907281,
                                h: 0.01383791619902734,
                                page: 2,
                            },
                        ],
                        number_of_pages: 4,
                    },
                    sha256: "rPvEebPm65PNoSW_A7Dg-3FGKz810a8eBC4I1IDcxfE=",
                },
                signed_uuid:
                    "eyJfcmFpbHMiOnsiZGF0YSI6IjA0YzI0MzY1LTY4NDYtNDEzNS1iZWFkLTBhMTY4NjdjNzdiZCIsImV4cCI6IjIwMjQtMDctMjlUMjA6MTk6NTIuNTMyWiIsInB1ciI6ImF0dGFjaG1lbnQifX0=--b32961c9bd8798da372a34b7c5c610c09f5d0af52251eace617e7117b25d5f0a",
                preview_images: [
                    {
                        id: 1482689,
                        name: "preview_images",
                        uuid: "b381d48c-b395-4ca0-ad51-d3c80753cc21",
                        record_type: "ActiveStorage::Attachment",
                        record_id: 1482688,
                        blob_id: 1217251,
                        created_at: "2024-06-22T12:11:26.889Z",
                        url: image,
                        metadata: {
                            analyzed: true,
                            identified: true,
                            width: 1400,
                            height: 1980,
                        },
                        filename: "0.jpg",
                    },
                    {
                        id: 1482690,
                        name: "preview_images",
                        uuid: "fb656013-5af7-44dd-8e56-7d6e324f950b",
                        record_type: "ActiveStorage::Attachment",
                        record_id: 1482688,
                        blob_id: 1217252,
                        created_at: "2024-06-22T12:11:27.140Z",
                        url: image,
                        metadata: {
                            analyzed: true,
                            identified: true,
                            width: 1400,
                            height: 1980,
                        },
                        filename: "1.jpg",
                    },
                    {
                        id: 1482691,
                        name: "preview_images",
                        uuid: "8863cc94-d9da-4a55-910a-f6b06eac265b",
                        record_type: "ActiveStorage::Attachment",
                        record_id: 1482688,
                        blob_id: 1217253,
                        created_at: "2024-06-22T12:11:27.411Z",
                        url: image,
                        metadata: {
                            analyzed: true,
                            identified: true,
                            width: 1400,
                            height: 1980,
                        },
                        filename: "2.jpg",
                    },
                    {
                        id: 1482692,
                        name: "preview_images",
                        uuid: "ae2bc614-91dd-43a9-a3ae-bc46311614d1",
                        record_type: "ActiveStorage::Attachment",
                        record_id: 1482688,
                        blob_id: 1217254,
                        created_at: "2024-06-22T12:11:27.636Z",
                        url: image,
                        metadata: {
                            analyzed: true,
                            identified: true,
                            width: 1400,
                            height: 1980,
                        },
                        filename: "3.jpg",
                    },
                ],
            },
        ],
    },
};
export default emptyData;
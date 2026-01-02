//Handler-------------
{
			    request: "crt.HandleViewModelAttributeChangeRequest",
			    handler: async (request, next) => {
			
			        if (request.attributeName === "LeadDS_UifBorrowerCellNumber_2ogqa3k") {
			
			            const phone = await request.$context.LeadDS_UifBorrowerCellNumber_2ogqa3k;
			            if (!phone) {
			                return next?.handle(request);
			            }
			
			            const value = phone.toString().trim();
			            console.log("Phone Change Triggered --> ", value);
			
			            // If contains any alphabet or non-digit → block immediately
			            const hasNonDigit = /[^0-9]/.test(value);
			            if (hasNonDigit) {
			
			                request.$context.LeadDS_UifBorrowerCellNumber_2ogqa3k = null;
			
			                request.$context.executeRequest({
			                    type: "crt.ShowDialogRequest",
			                    $context: request.$context,
			                    dialogConfig: {
			                        data: {
			                            message: phone + " - Phone number must contains digits only",
			                            actions: [{
			                                key: "OK",
			                                config: { color: "primary", caption: "OK" }
			                            }]
			                        }
			                    }
			                });
			
			                return next?.handle(request);
			            }
			
			            //Do not validate until 10 digits entered
			            if (value.length < 10) {
			                return next?.handle(request);
			            }
			
			            // Final 10-digit validation
			            const isValid = /^[0-9]{10}$/.test(value);
			            if (!isValid) {
			
			                request.$context.LeadDS_MobilePhone_tmwm16h = null;
			
			                request.$context.executeRequest({
			                    type: "crt.ShowDialogRequest",
			                    $context: request.$context,
			                    dialogConfig: {
			                        data: {
			                            message: phone + " - Enter a valid 10-digit mobile number",
			                            actions: [{
			                                key: "OK",
			                                config: { color: "primary", caption: "OK" }
			                            }]
			                        }
			                    }
			                });
			            }
			        }
			
			        return next?.handle(request);
			    }
			}
